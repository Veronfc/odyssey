import { jwt } from "@elysiajs/jwt";
import { Elysia, status } from "elysia";

export const authJwt = new Elysia({ name: "authJwt" }).use(
	jwt({
		name: "jwt",
		secret: Bun.env.JWT_SECRET || "SuperSecret",
		exp: "1h"
	})
);