import { Hono } from "hono";
import playersRouter from "./routes/players.route";
import lobbiesRoute from "./routes/lobbies.route";

const app = new Hono()
	.route("/player", playersRouter)
  .route("/lobby", lobbiesRoute)
	.get("/", (context) => context.json({ message: "Hello from Hono" }));

export default {
	port: 8080,
	fetch: app.fetch
};

export type AppType = typeof app;
