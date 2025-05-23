import { z } from "zod";

export const postLobbySchema = z.object({
  name: z.string({required_error: "Lobby name is required"}).regex(/^[a-zA-z0-9_-]+$/, {message: "Lobby name can only include letters, numbers, underscores and dashes"}).min(5, {message: "Lobby name must be at least 5 characters long"}).max(30, {message: "Lobby name must be at most 30 characters long"}),
  isPrivate: z.boolean(),
  password: z.string().min(8, {message: "Lobby password must be at least 8 characters long"}).optional().or(z.literal('')) // FIXME optional validation not working
})