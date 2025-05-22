import { Elysia, t, status } from "elysia";
import { jwtPlugin } from "../plugins/auth.plugin";
import { CreateLobbyDto, CreateLobbyResponseDto } from "../models/lobby.dto";
import { createLobby, fetchActiveLobbies } from "../services/lobby.service";
import { createGuest, playerExists } from "../services/player.service";

type TokenPayload = {
	id: string;
	username: string;
	role: string;
};

const lobbyRoute = new Elysia({ prefix: "/lobby" })
	.use(jwtPlugin)
	.decorate("tokenInfo", null as unknown as TokenPayload)
	.guard(
		{
			async beforeHandle({ jwt, cookie: { auth } }) {
				const token = await jwt.verify(auth?.value);

				if (!token) {
					return status(401, "Unauthorized");
				}
			}
		},
		(app) =>
			app
				.resolve(async ({ jwt, cookie: { auth } }) => {
					const token = await jwt.verify(auth!.value);

					if (!token) return status(401, "Unauthorized");

					const tokenInfo: TokenPayload = {
						id: token.id as string,
						username: token.username as string,
						role: token.role as string
					};

          // add guest to players list if guest has a token but is not there already
          if (playerExists(tokenInfo.id)) {
            if (tokenInfo.role === "guest") {
              createGuest(tokenInfo.username, tokenInfo.id)
            }
          }

					return {
						tokenInfo
					};
				})
				.post(
					"/create",
					async ({ tokenInfo, body }) => {
						const { code, message, lobby } = createLobby(
							body.name,
							tokenInfo.id as string,
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
				// .post("/:id/join", "Join a lobby")
				// .post("/:id/leave", "Leave a lobby")
				// .get("/:id", "Lobby info")
				.get("/active", () => {
					return status(200, fetchActiveLobbies());
				})
		// .post("/:id/start", "Launch a match")
		// .delete("/:id", "Disband/destroy lobby")
		// .ws(":id", "Connect to lobby socket");
		//listen for player-joined, player-left, chat and match-started
	);

export { lobbyRoute };
