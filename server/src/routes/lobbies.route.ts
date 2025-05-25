import { Hono } from "hono";
import {
	postJoinLobbySchema,
	postLobbySchema
} from "../validation/lobby.schema";
import { ZodError } from "zod";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { authGuard } from "../middleware/auth.guard";
import { usePlayers } from "../composables/usePlayers";
import { useLobbies } from "../composables/useLobbies";

const { fetchPlayer } = usePlayers();
const {
	createLobby,
	fetchLobby,
	joinLobby,
	leaveLobby,
	removeLobby,
	inLobby,
	isHost
} = useLobbies();


// TEST all routes
// TODO enforce lobby cap
const lobbiesRoute = new Hono()
	.onError((error) => {
		if (error instanceof ZodError) {
			const formattedErrors = error.issues.map((issue) => {
				return {
					field: issue.path[0],
					message: issue.message
				};
			});

			throw new HTTPException(400, {
				res: new Response(JSON.stringify(formattedErrors))
			});
		}

		console.error(error);
		throw new HTTPException(500, {
			message: "A server error has occurred"
		});
	})
	.use(authGuard)
	.post(
		"/",
		zValidator("json", postLobbySchema, (result) => {
			if (!result.success) {
				throw result.error;
			}
		}),
		(context) => {
			const { name, maxPlayers, isPrivate, password } =
				context.req.valid("json");

			const token = context.get("token");
			const host = fetchPlayer(token.id)!;

			if (host?.inLobby || host?.inMatch)
				throw new HTTPException(409, {
					message: "You are already in a lobby"
				});

			const id = createLobby(name, host, maxPlayers, isPrivate, password);

			return context.json({ lobbyId: id }, 201);
		}
	)
	.post(
		"/:id/join",
		zValidator("json", postJoinLobbySchema, (result) => {
			if (!result.success) {
				throw result.error;
			}
		}),
		(context) => {
			const lobbyId = context.req.param("id");
			const { password } = context.req.valid("json");

			const { id: playerId } = context.get("token");
			const player = fetchPlayer(playerId);
			const lobby = fetchLobby(lobbyId);

			if (!lobby) return context.notFound();
			if (inLobby(lobbyId, player!.id))
				throw new HTTPException(409, {
					message: "You are already a member of this lobby"
				});
			if (player?.inLobby || player?.inMatch)
				throw new HTTPException(409, {
					message: "You are already in a lobby"
				});
			if (lobby?.isFull)
				throw new HTTPException(403, { message: "Lobby is full" });
			if (lobby?.password === password)
				throw new HTTPException(401, {
					message: "Password is incorrect"
				});

			joinLobby(lobbyId, player!);

			context.status(204);
			return context.text(lobbyId);
		}
	)
	.post("/:id/leave", (context) => {
		const lobbyId = context.req.param("id");
		const lobby = fetchLobby(lobbyId);
		const { id: playerId } = context.get("token");

		if (!lobby) return context.notFound();
		if (!inLobby(lobbyId, playerId))
			throw new HTTPException(409, {
				message: "You are not a member of this lobby"
			});

		leaveLobby(lobbyId, playerId);

		context.status(204);
		return context.text("You have successfully left the lobby");
	})
	.delete("/:id", (context) => {
		const id = context.req.param("id");
		const lobby = fetchLobby(id);
		const { id: playerId } = context.get("token");

		if (!lobby) return context.notFound();
		if (isHost(id, playerId))
			throw new HTTPException(403, {
				message: "You are not the host of this lobby"
			});

		removeLobby(id);

		context.status(204);
		return context.text("You have successfully removed the lobby");
	});

export default lobbiesRoute;
