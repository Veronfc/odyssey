import { Elysia, t, status } from "elysia";

const player = new Elysia({ prefix: "/player" });

player.post("/login", ({ body }) => status(200, "Login here"), {
	body: t.Object({
		username: t.Required(t.String(), { error: "Username required" }),
		password: t.Required(t.String(), { error: "Password is required" })
	}),
	response: {
		200: t.String(),
		401: t.String()
	}
});

player.post("/signup", ({ body }) => status(200, "Sign up here"), {
	body: t.Object({
		username: t.Required(
			t.String({
				minLength: 3,
				maxLength: 20,
				error: "Username must be between 3 and 20 characters long (inclusive)"
			}),
			{
				error: "Username required"
			}
		),
		password: t.String({
			pattern:
				"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
			error: "Password must be at least 8 characters long and contain at least:\nOne uppercase alphabet\nOne lowercase alphabet\nOne number\nOne special character (@, $, !, %, *, ? or &)"
		})
	}),
	response: {
		201: t.String(),
		409: t.String()
	}
});

player.get("/guest", "Get a guest token");

player.get("/:id", "Your info");

export { player };
