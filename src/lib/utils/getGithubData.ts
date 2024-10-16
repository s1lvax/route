import type { GithubData, GitHubEvent } from '$lib/types/GithubData';

export const getGithubData = async (username: string): Promise<GithubData> => {
	const userUrl = `https://api.github.com/users/${username}`;
	const eventsUrl = `https://api.github.com/users/${username}/events`;
	const perPage = 100;
	const maxPages = 3;
	const contributions: GitHubEvent[] = [];

	const now = new Date();
	const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

	try {
		const [userResponse] = await Promise.all([fetch(userUrl, { method: 'GET' })]);

		if (!userResponse.ok) {
			throw new Error(`Error fetching user profile: ${userResponse.statusText}`);
		}

		const userData = await userResponse.json();

		for (let page = 1; page <= maxPages; page++) {
			const url = `${eventsUrl}?per_page=${perPage}&page=${page}`;
			const eventsResponse = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.github+json'
				}
			});

			if (!eventsResponse.ok) {
				throw new Error(`Error fetching events: ${eventsResponse.statusText}`);
			}

			const events = await eventsResponse.json();

			if (events.length === 0) break;

			const recentEvents = events.filter(
				(event: GitHubEvent) => new Date(event.created_at) >= thirtyDaysAgo
			);
			contributions.push(...recentEvents);

			if (events.length < perPage) break;
		}

		return {
			repoCount: userData.public_repos,
			contributionsCount: contributions.length,
			avatarUrl: userData.avatar_url,
			name: userData.name,
			url: userData.html_url,
			company: userData.company,
			blog: userData.blog,
			followers: userData.followers,
			bio: userData.bio
		};
	} catch (error) {
		console.error('Failed to fetch GitHub data:', error);
		throw error;
	}
};
