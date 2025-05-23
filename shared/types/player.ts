export type Player = {
	id: string;
	username: string;
	role: Role;
	inLobby: boolean;
	inMatch: boolean;
  timeout: ReturnType<typeof setTimeout>
};

export enum Role {
	Guest = "guest",
	Member = "member"
}
