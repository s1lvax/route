export interface User {
	githubId: number;
	githubUsername: string;
	views: number;
	praises: number;
	pfp: string | null;
	repoCount: number;
	contributionsCount: number;
	updatedAt: Date;
}
