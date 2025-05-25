import type { Player } from "./player";

export type Lobby = {
	id: string;
	name: string;
	hostId: string;
	players: Player[];
	maxPlayers: number;
	isPrivate: boolean;
	password: string | undefined;
	isFull: boolean;
};
