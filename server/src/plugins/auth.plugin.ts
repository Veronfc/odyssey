import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";

export const jwtPlugin = new Elysia({ name: "jwt" }).use(
	jwt({
		name: "jwt",
		secret: Bun.env.JWT_SECRET || "SuperSecret"
	})
);
