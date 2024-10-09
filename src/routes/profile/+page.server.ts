import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { countGithubProjects } from '$lib/utils/countGithubProjects';
import { getGithubUsername } from '$lib/utils/getGithubUsername';
import { fetchGitHubContributionsCount } from '$lib/utils/fetchGitHubContributions'; // Import the new function
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	// Extract user ID from the image URL
	const userId = getGitHubUserIdFromImageUrl(session.user.image);

	// Check if user ID is defined
	if (!userId) {
		throw new Error('User ID could not be determined from image URL');
	}

	// Get the GitHub username asynchronously
	const username = await getGithubUsername(session.user.image);

	// Check if username is defined
	if (!username) {
		throw new Error('Username could not be determined from image URL');
	}

	// Check if the user exists in the database
	let user = await prisma.user.findUnique({
		where: { githubId: userId } // Use the extracted userId
	});

	// If user does not exist, create a new user record
	if (!user) {
		user = await prisma.user.create({
			data: {
				githubId: userId,
				githubUsername: username
			}
		});
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
