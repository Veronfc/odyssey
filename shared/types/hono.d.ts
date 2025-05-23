import type { Token } from "./auth";

declare module "hono" {
	interface ContextVariableMap {
		token: Token;
	}
}
