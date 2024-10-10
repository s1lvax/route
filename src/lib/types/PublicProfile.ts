export interface PublicProfile {
	links: { title: string; url: string }[];
	skills: { title: string; level: string }[];
	repoCount: number;
	contributionsCount: number;
	pfp: string | null;
	praises: number;
	username: string;
}
