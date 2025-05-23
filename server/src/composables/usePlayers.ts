import { faker } from "@faker-js/faker";
import { type Player, Role } from "shared/types/player";

const players = new Map<string, Player>();

export const usePlayers = () => {
	const createGuest = (id?: string, username?: string) => {
		const guestId = id || Bun.randomUUIDv7();
		const guestUsername = username || `guest_${faker.internet.username()}`;

		const guest: Player = {
			id: guestId,
			username: guestUsername,
			role: Role.Guest,
			inLobby: false,
			inMatch: false,
      timeout: setTimeout(() => {
        removePlayer(guestId)
      }, 1000 * 60 * 10)
		};

		players.set(guestId, guest);

		return { guestId, guestUsername };
	};

  const fetchPlayer = (id: string) => {
    return players.get(id)
  }
  
  const fetchAllPlayers = () => {
    return players.values().toArray()
  }

  const removePlayer = (id: string) => {
    players.delete(id)
  }

	return { createGuest, fetchPlayer, fetchAllPlayers, removePlayer };
};
