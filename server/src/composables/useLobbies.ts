import type { Lobby } from "shared/types/lobby";
import type { Player } from "shared/types/player";
import { usePlayers } from "./usePlayers";

const { fetchPlayer, updatePlayer } = usePlayers();

const lobbies = new Map<string, Lobby>();

export const useLobbies = () => {
	const createLobby = (
		name: string,
		host: Player,
		maxPlayers: number,
		isPrivate: boolean,
		password?: string
	) => {
		const id = Bun.randomUUIDv7();

		const lobby: Lobby = {
			id,
			name,
			hostId: host.id,
			players: [host],
			maxPlayers,
			isPrivate,
			password: password,
			isFull: false
		};

		lobbies.set(id, lobby);

		host.inLobby = true;
		updatePlayer(host);

		return id;
	};

	const fetchLobby = (id: string) => {
		return lobbies.get(id);
	};

	const joinLobby = (id: string, player: Player) => {
		const lobby = lobbies.get(id);

		lobby!.players.push(player);

		player.inLobby = true;

		updatePlayer(player);

		if (lobby!.players.length === lobby!.maxPlayers) {
			lobby!.isFull = true;
		}

		lobbies.set(id, lobby!);
	};

	const leaveLobby = (id: string, playerId: string) => {
		const lobby = lobbies.get(id);

		const index = lobby?.players.findIndex(
			(player) => player.id === playerId
		);

		lobby?.players.splice(index!, 1);

		lobbies.set(id, lobby!);

		const player = fetchPlayer(playerId);
		player!.inLobby = false;
		updatePlayer(player!);
	};

	const removeLobby = (id: string) => {
		const lobby = lobbies.get(id);

		lobbies.delete(id);

		lobby?.players.forEach((player) => {
			player.inLobby = false;
			updatePlayer(player);
		});
	};

	const inLobby = (id: string, playerId: string) => {
		const lobby = lobbies.get(id);

		return lobby!.players.some((player) => player.id === playerId);
	};

	const isHost = (id: string, playerId: string) => {
		const lobby = lobbies.get(id);

		return lobby?.hostId === playerId;
	};

	return {
		createLobby,
		fetchLobby,
		joinLobby,
		leaveLobby,
		removeLobby,
		inLobby,
		isHost
	};
};
