import { Elysia, t, status } from "elysia";
import { guestJwt, memberJwt } from "../plugins/auth.plugin";

const lobby = new Elysia({ prefix: "/lobby" })
	.use(guestJwt)
	.use(memberJwt)
	.onBeforeHandle(
		async ({ guestJwt, memberJwt, cookie: { guestAuth, memberAuth } }) => {
			if (guestAuth) {
				const guestToken = await guestJwt.verify(guestAuth.value);

				if (!guestToken) {
					return status(401, "Unauthorized");
				}

				//replace guest token
				const newGuestToken = await guestJwt.sign({
					username: guestToken.username as string
				});

				guestAuth.set({
					value: newGuestToken,
					httpOnly: true,
					path: "/"
				});
			}

			// if (memberAuth) {
			// }
		}
	)
	.post("/create", "Create a lobby")
	.post("/:id/join", "Join a lobby")
	.post("/:id/leave", "Leave a lobby")
	.get("/:id", "Lobby info")
	.get("/active", "List all active lobbies")
	.post("/:id/start", "Launch a match")
	.delete("/:id", "Disband/destroy lobby")
	.ws(":id", "Connect to lobby socket");
//listen for player-joined, player-left, chat and match-started

export { lobby };
