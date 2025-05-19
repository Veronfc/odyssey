import { Elysia, status, t } from "elysia";
import { authJwt } from "../plugins/auth.plugin";
import {faker} from '@faker-js/faker'

const player = new Elysia({ prefix: "/player" })
	.use(authJwt)
	.get("/guest", async ({jwt, cookie: {auth}}) => {
    const tempUsername = `guest_${faker.internet.username()}`
    const guestToken = await jwt.sign({username: tempUsername})

     auth?.set({
      value: guestToken,
      httpOnly: true,
      path: '/'
    })

    return status(201, {username: tempUsername})
  }, {
		response: {
			201: t.Object({
        username: t.String()
      })
		}
	})

export { player };
