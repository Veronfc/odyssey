import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { player } from "./routes/playerRoute";
import { lobby } from "./routes/lobbyRoute";
import { match } from "./routes/matchRoute";

const app = new Elysia()
	.use(
		swagger({
			provider: "swagger-ui"
		})
	)
	.use(player)
	.use(lobby)
	.use(match)
	.listen(8080);

console.log(
	`View documentation at "${app.server!.url}swagger" in your browser`
);

export type App = typeof app
