import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";

export const guestJwt = new Elysia({ name: "guestJwt" }).use(
	jwt({
		name: "guestJwt",
		secret: Bun.env.JWT_SECRET || "SuperSecret",
		exp: "2m"
	})
);

export const memberJwt = new Elysia({name: 'memberJwt'}).use(
  jwt({
		name: "memberJwt",
		secret: Bun.env.JWT_SECRET || "SuperSecret",
		exp: "24h"
	})
)