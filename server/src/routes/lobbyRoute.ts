import { Elysia, t, status } from "elysia";

const lobby = new Elysia({ prefix: "/lobby" })
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
