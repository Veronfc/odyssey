import { Elysia, t, status } from "elysia";

const match = new Elysia({ prefix: "/match" })
	.get("/:id/state", "Get current match state")
	.get("/:id/result", "Get match result")
	.ws("/:id", "Connect to match socket");
//list for start, move, end-turn, forfeit, end, result

export { match };
