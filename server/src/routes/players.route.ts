import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";
import { usePlayers } from "../composables/usePlayers";
import { decodeToken, signToken } from "../services/token.service";
import { authGuard } from "../middleware/auth.guard"; 
import { Role } from "shared/types/player";

const COOKIE_SECRET = Bun.env.COOKIE_SECRET || "CookieSuperSecret";

const { createGuest, fetchPlayer, fetchAllPlayers, removePlayer } = usePlayers();

const playersRouter = new Hono()
	.get("/guest", async (context) => {
    const existingToken = await getSignedCookie(context, COOKIE_SECRET, "auth");

    if (existingToken) {
      const payload = decodeToken(existingToken);

      if (!fetchPlayer(payload.id as string)) {
        createGuest(payload.id as string, payload.username as string)
      }

      throw new HTTPException(409, {message: "You're already signed in"})
    }

		const { guestId, guestUsername } = createGuest();

		const token = await signToken(guestId, guestUsername, Role.Guest);

		await setSignedCookie(context, "auth", token, COOKIE_SECRET, {
			httpOnly: true,
			path: "/",
      maxAge: 60 * 2
		});

		return context.json({ id: guestId, username: guestUsername }, 201);
	})
  // TODO .post("/member", (context) => {throw new HTTPException(501)})
  .use(authGuard)
  .get("/", (context) => context.json(fetchAllPlayers()))
  .get("/:id", context => {
    const token = context.get("token")
    const player = fetchPlayer(context.req.param("id"))
    
    if (!player) {
      return context.notFound()
    }

    if (player.id !== token.id) {
      throw new HTTPException(403)
    }

    return context.json({player})
  })
  .delete("/:id", context => {
    removePlayer(context.req.param("id"))
    deleteCookie(context, 'auth')

    return context.json({message: "Player removed successsfully"}, 204 as ContentfulStatusCode)
  })

export default playersRouter;
