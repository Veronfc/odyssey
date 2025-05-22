import { Elysia, status, t } from "elysia";
import { jwtPlugin } from "../plugins/auth.plugin";
import { createGuest, fetchActivePlaters, playerExists } from "../services/player.service";

const playerRoute = new Elysia({ prefix: "/player" })
.use(jwtPlugin)
.get("/guest", async ({ jwt, cookie: { auth } }) => {
		const token = await jwt.verify(auth?.value);

		if (token) {
      // add guest to players list if guest has a token but is not there already
      if (playerExists(token.id as string)) {
        createGuest(token.username as string, token.id as string)
      }

			return status(409, "You're already logged in");
		}

		const { id, username } = createGuest();
		const guestToken = await jwt.sign({
			id,
			username,
			role: "guest",
			exp: Math.floor(Date.now() / 1000) + 60 * 2
		}); // TODO update exp when deploying

		auth?.set({
			value: guestToken,
			httpOnly: true,
			path: "/",
			maxAge: 60 * 2 // TODO update maxAge when deploying
		});

		return status(201, { id: id, username: username });
	},
	{
		response: {
			201: t.Object({
				id: t.String(),
				username: t.String()
			}),
			409: t.String()
		}
	}
);
// .get("/active", () => {
//   return status(200, fetchActivePlaters())
// })

export { playerRoute };
