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

const createGuest = (username?: string, id?: string) => {
	const guest: Player = {
		id: id || uuid(),
		username: username || `guest_${faker.internet.username()}`,
		isGuest: true,
		inLobby: false,
		inMatch: false
	};

	players.set(guest.id, guest);

	return { id: guest.id, username: guest.username };
};

const playerExists = (id: string) => {
  return Boolean(players.get(id))
}

const fetchActivePlaters = () => {
	return players.values().toArray();
};

export { type Player, players, createGuest, playerExists, fetchActivePlaters };
