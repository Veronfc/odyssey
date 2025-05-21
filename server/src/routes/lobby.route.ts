import { Elysia, t, status } from "elysia";
import { jwtPlugin } from "../plugins/auth.plugin";
import { CreateLobbyDto, CreateLobbyResponseDto } from "../models/lobby.dto";
import { createLobby } from "../services/lobby.service";

const lobbyRoute = new Elysia({ prefix: "/lobby" })
	.use(jwtPlugin)
	.onBeforeHandle(async ({ jwt, cookie: { auth } }) => {
		const token = await jwt.verify(auth?.value);

		if (!token) {
			return status(401, "Unauthorized");
		}
		// TODO move into standalone refresh method
		let expiresIn = token.role === "guest" ? 60 * 5 : 60 * 60;

		const newToken = await jwt.sign({
			id: token.id as string,
			username: token.username as string,
			role: token.role as string,
			exp: expiresIn
		});

		auth!.set({
			value: newToken,
			httpOnly: true,
			path: "/"
		});
		//=====
	})
	.post(
		"/create",
		async ({ jwt, cookie: { auth }, body }) => {
			// TODO update auth guards to return token
			const token = await jwt.verify(auth!.value);

			if (!token) return status(401, "Unauthorized");

			const { code, message, lobby } = createLobby(
				body.name,
				token.id as string,
				body.isPrivate,
				body.password
			);

			if (code === 201) {
				return status(201, lobby);
			}

			return status(code, message);
		},
		{
			body: CreateLobbyDto,
			response: CreateLobbyResponseDto
		}
	)
	.post("/:id/join", "Join a lobby")
	.post("/:id/leave", "Leave a lobby")
	.get("/:id", "Lobby info")
	.get("/active", "List all active lobbies")
	.post("/:id/start", "Launch a match")
	.delete("/:id", "Disband/destroy lobby")
	.ws(":id", "Connect to lobby socket");
//listen for player-joined, player-left, chat and match-started

export { lobbyRoute };
