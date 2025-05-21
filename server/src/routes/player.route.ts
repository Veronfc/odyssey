import { Elysia, status, t } from "elysia";
import { jwtPlugin } from "../plugins/auth.plugin";
import { createGuest } from "../services/player.service";

const playerRoute = new Elysia({ prefix: "/player" }).use(jwtPlugin).get(
	"/guest",
	async ({ jwt, cookie: { auth } }) => {
		const { id, username } = createGuest();
		const guestToken = await jwt.sign({
			id,
			username,
			role: "guest",
			exp: 60 * 5
		}); // TODO update exp when deploying

		auth?.set({
			value: guestToken,
			httpOnly: true,
			path: "/"
		});

		return status(201, { id: id, username: username });
	},
	{
		response: {
			201: t.Object({
				id: t.String(),
				username: t.String()
			})
		}
	}
);

export { playerRoute };
