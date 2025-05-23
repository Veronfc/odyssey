import { createMiddleware } from "hono/factory";
import { getSignedCookie } from "hono/cookie";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { HTTPException } from "hono/http-exception";
import { usePlayers } from "../composables/usePlayers";
import { verifyToken } from "../services/token.service";
import type { Token } from "shared/types/auth";
import { Role } from "shared/types/player";

const COOKIE_SECRET = Bun.env.COOKIE_SECRET || "CookieSuperSecret";

const { createGuest, fetchPlayer } = usePlayers()

export const authGuard = createMiddleware(async (context, next) => {
	const token = await getSignedCookie(context, COOKIE_SECRET, "auth");

	if (!token) {
		throw new HTTPException(401);
	}

	const { payload, message, code } = await verifyToken(token);

	if (code !== 200) {
    throw new HTTPException(code as ContentfulStatusCode, { message });
	}

  if (!fetchPlayer(payload!.id as string)) {
    if (payload!.role === Role.Guest) {
      createGuest(payload!.id, payload!.username)
    } 

    if (payload!.role === Role.Member) {
      // TODO add createMember method to usePlayer
    }
  }
  
	context.set("token", payload as Token);

	await next();
});
