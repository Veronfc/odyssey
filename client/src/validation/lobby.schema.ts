import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const CreateLobbySchema = toTypedSchema(
	z.object({
		name: z
			.string()
			.min(5, "Name must be at least 5 characters long")
			.max(50, "Name must be at most 50 characters long")
			.regex(
				/^[a-zA-Z0-9\_\-\s]+$/,
				"Name can only include: letter, numbers, dashes, underscores or spaces"
			),
		password: z.string().optional() // TODO add regexp security check for password
	})
);

export { CreateLobbySchema };
