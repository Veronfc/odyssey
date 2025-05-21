import { t } from "elysia";

const CreateLobbyDto = t.Object({
	name: t.String({
		pattern: "^[a-zA-Z0-9_\\- ]{5,50}$",
		error: "Lobby name must be between 5 and 50 characters long, and only consist of alphabets, numbers, underscores, dashes and spaces"
	}),
	isPrivate: t.Boolean({ default: false }),
	password: t.Optional(t.String()) //TODO add password regexp check and error message
});

const CreateLobbyResponseDto = {
	201: t.Object({
		id: t.String(),
		name: t.String(),
		hostId: t.String(),
		players: t.Array(
			t.Object({
				id: t.String(),
				username: t.String(),
				isGuest: t.Boolean(),
				inLobby: t.Boolean(),
				inMatch: t.Boolean()
			})
		),
		isPrivate: t.Boolean(),
		createdAt: t.Date(),
		isFull: t.Boolean()
	}),
	400: t.String(),
	401: t.String(),
	409: t.String()
};

export { CreateLobbyDto, CreateLobbyResponseDto };
