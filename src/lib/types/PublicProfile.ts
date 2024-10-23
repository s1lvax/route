export interface PublicProfile {
	links: Array<{ title: string; url: string }>;
	skills: Array<{ title: string; level: string }>;
	username: string;
	isOpenToCollaborating: boolean;
	hobbies: Array<{hobby:string}>;
}
