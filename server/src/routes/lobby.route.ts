import { Elysia, t, status } from "elysia";
import { authJwt } from "../plugins/auth.plugin";

const lobby = new Elysia({ prefix: "/lobby" })
  .use(authJwt)
  .onBeforeHandle(async({jwt, cookie: {auth}}) => {
    const token = await jwt.verify(auth?.value)

    if (!token) {
      return status(401, 'Unauthorized')
    } 

    console.info(token.username)
  })
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
