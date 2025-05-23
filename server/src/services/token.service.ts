import { sign, verify, decode } from "hono/jwt";
import { JwtTokenExpired } from "hono/utils/jwt/types";
import type { Token } from "shared/types/auth";
import type { Role } from "shared/types/player";

const JWT_SECRET = Bun.env.JWT_SECRET || "SuperSecret";

const signToken = async (id: string, username: string, role: Role) => {
	const expirationTime = role === "guest" ? 60 * 2 : 60 * 60 * 24;

	const exp = Math.floor(Date.now() / 1000) + expirationTime;

	const payload = {
		id,
		username,
		role,
		exp
	};

	return await sign(payload, JWT_SECRET);
};

const verifyToken = async (token: string) => {
	try {
		const payload = await verify(token, JWT_SECRET);
		delete payload.exp;
		return { payload: payload as Token, code: 200 };
	} catch (error) {
		if (error instanceof JwtTokenExpired)
			return { message: "Token has expired", code: 401 };

		console.error(`Date/Time: ${new Date()}\nError: ${error}`);
		return { message: "A server error has occurred", code: 500 };
	}
};

const decodeToken = (token: string) => {
	return decode(token).payload;
};

export { signToken, verifyToken, decodeToken };
