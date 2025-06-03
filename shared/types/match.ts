import type { Player } from "./player"

export type Match = {
  id: string
  hostId: string
  players: Player[]
  status: Status
  // TODO
}

export enum Status {
  ACTIVE = "active",
  FINISHED = "finished"
}