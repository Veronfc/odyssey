import { Elysia, status, t } from "elysia";
import { guestJwt, memberJwt } from "../plugins/auth.plugin";
import { faker } from "@faker-js/faker";

const player = new Elysia({ prefix: "/player" })
	.use(guestJwt)
	//.use(memberJwt)
	.get(
		"/guest",
		async ({ guestJwt, cookie: { guestAuth } }) => {
			const tempUsername = `guest_${faker.internet.username()}`;
			const guestToken = await guestJwt.sign({ username: tempUsername });

			guestAuth?.set({
				value: guestToken,
				httpOnly: true,
				path: "/"
			});

			return status(201, tempUsername);
		},
		{
			response: {
				201: t.String()
			}
		}
	);

export { player };
