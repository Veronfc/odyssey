export type Player = {
	id: string;
	username: string;
	role: Role;
	inLobby: boolean;
	inMatch: boolean;
	//TODO timeout: ReturnType<typeof setTimeout>
};

export enum Role {
	Guest = "guest",
	Member = "member"
}
