export interface GithubData {
	contributionsCount: number;
	repoCount: number;
	avatarUrl: string;
	name: string | null;
	url: string;
	company: string | null;
	blog: string | null;
	followers: number;
	bio: string | null;
}

export interface GitHubEvent {
	created_at: string;
}
