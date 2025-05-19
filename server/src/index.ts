import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {cors} from '@elysiajs/cors'
import { player } from "./routes/player.route";
import { lobby } from "./routes/lobby.route";
import { match } from "./routes/match.route";

const app = new Elysia()
  .use(cors())
	.use(
		swagger({
			provider: "swagger-ui"
		})
	)
	.use(player)
	.use(lobby)
	.use(match)
	.listen(8080, () => {
		console.info(
			`Server started at http://localhost:8080 \nSwagger UI at http://localhost:8080/swagger`
		);
	});

export type App = typeof app;
