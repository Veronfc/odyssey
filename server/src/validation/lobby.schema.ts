import { z } from "zod";

export const postLobbySchema = z.object({
	name: z
		.string({ required_error: "Lobby name is required" })
		.regex(/^[a-zA-z0-9_-]+$/, {
			message:
				"Lobby name can only include letters, numbers, underscores and dashes"
		})
		.min(5, { message: "Lobby name must be at least 5 characters long" })
		.max(30, { message: "Lobby name must be at most 30 characters long" }),
	maxPlayers: z
		.number()
		.min(2, { message: "Lobby must allow a minimum of 2 players" })
		.max(4, { message: "Lobby allows a maximum of 4 players" }),
	isPrivate: z.boolean(),
	password: z
		.string()
		.min(8, {
			message: "Lobby password must be at least 8 characters long"
		})
		.optional()
	// FIXME optional validation for password not working
});

export const postJoinLobbySchema = z.object({
	password: z.string().optional()
});
