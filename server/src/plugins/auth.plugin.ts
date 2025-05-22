import { jwt } from "@elysiajs/jwt";
import { Elysia, status } from "elysia";

// TODO add token refresh

const jwtPlugin = new Elysia({ name: "jwt" }).use(
	jwt({
		name: "jwt",
		secret: Bun.env.JWT_SECRET || "SuperSecret"
	})
);

export { jwtPlugin };
