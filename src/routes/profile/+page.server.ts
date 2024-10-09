import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { countGithubProjects } from '$lib/utils/countGithubProjects';
import { getGithubUsername } from '$lib/utils/getGithubUsername';
import { fetchGitHubContributionsCount } from '$lib/utils/fetchGitHubContributions'; // Import the new function

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	// Get the GitHub username asynchronously
	const username = await getGithubUsername(session.user.image);

	// Check if username is defined
	if (!username) {
		throw new Error('Username could not be determined from image URL');
	}

	// Fetch the repository count using the username
	const repoCount = await countGithubProjects(username);

	// Fetch contributions count using the username
	const contributionsCount = await fetchGitHubContributionsCount(username);

	// Create the userStats object
	const userStats = {
		repoCount,
		contributionsCount
	};

	return { userStats }; // Return the userStats object
};
