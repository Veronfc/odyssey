import { faker } from "@faker-js/faker";
import { type UUIDTypes, v4 as uuid } from "uuid";

//TODO add bad-words profanity filter
type Player = {
	id: string;
	username: string;
	isGuest: boolean;
	inLobby: boolean;
	inMatch: boolean;
};

const players = new Map<UUIDTypes, Player>();

const createGuest = () => {
	const username = `guest_${faker.internet.username()}`;

	const guest: Player = {
		id: uuid(),
		username,
		isGuest: true,
		inLobby: false,
		inMatch: false
	};

	players.set(guest.id, guest);

	return { id: guest.id, username: username };
};

export { type Player, players, createGuest };
