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
	twitter: string | null;
}

export interface GitHubEvent {
	created_at: string;
}

export interface Contributor {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	contributions: number;
}
