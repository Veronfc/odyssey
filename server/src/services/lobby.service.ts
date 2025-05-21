import { type UUIDTypes, v4 as uuid } from "uuid";
import { players, type Player } from "./player.service";
import { Filter } from "bad-words";

type Lobby = {
	id: UUIDTypes;
	name: string;
	hostId: UUIDTypes;
	players: Player[];
	isPrivate: boolean;
	password?: string;
	createdAt: Date;
	isFull: boolean;
};

const lobbies = new Map<UUIDTypes, Lobby>();

const filter = new Filter();

const createLobby = (
	name: string,
	hostId: UUIDTypes,
	isPrivate: boolean,
	password?: string
) => {
	const host = players.get(hostId)!;

	if (host.inLobby) {
		return { code: 409, message: "You're already in a lobby" };
	}

	if (filter.isProfane(name)) {
		return { code: 400, message: "Lobby name contains profanity" };
	}

	if (isPrivate && !password) {
		return {
			code: 400,
			message: "Please enter a password for your private lobby"
		};
	}

	const newLobby: Lobby = {
		id: uuid(),
		name,
		hostId,
		players: [host],
		isPrivate,
		password, // TODO hash password
		createdAt: new Date(),
		isFull: false
	};

	lobbies.set(newLobby.id, newLobby);

	host.inLobby = true;
	players.set(host.id, host);

	return { code: 201, lobby: newLobby };
};

export { lobbies, createLobby };
