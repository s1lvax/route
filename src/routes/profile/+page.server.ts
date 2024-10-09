import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { countGithubProjects } from '$lib/utils/countGithubProjects';
import { getGithubUsername } from '$lib/utils/getGithubUsername';
import { fetchGitHubContributionsCount } from '$lib/utils/fetchGitHubContributions';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { prisma } from '$lib/server/prisma';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { linksSchema } from '$lib/schemas/links';
import type { User } from '$lib/types/User';

// user
let user: User | null;

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	// Extract user ID from the image URL
	const userId = getGitHubUserIdFromImageUrl(session.user.image);

	// Check if user ID is defined
	if (!userId) {
		throw new Error('User ID could not be determined from image URL');
	}

	// Check if the user exists in the database
	user = await prisma.user.findUnique({
		where: { githubId: userId }
	});

	// If user does not exist, create a new user record and fetch the username
	if (!user) {
		const username = await getGithubUsername(session.user.image);

		// Check if username is defined
		if (!username) {
			throw new Error('Username could not be determined from image URL');
		}

		user = await prisma.user.create({
			data: {
				githubId: userId,
				githubUsername: username
			}
		});
	}

	// Fetch the repository count using the username
	const repoCount = await countGithubProjects(user.githubUsername);

	// Fetch contributions count using the username
	const contributionsCount = await fetchGitHubContributionsCount(user.githubUsername);

	// Fetch all links associated with the user ID
	const links = await prisma.link.findMany({
		where: { userId: user.githubId } // Filter links by userId
	});

	// Create the userStats object, including views and praises
	const userStats = {
		repoCount,
		contributionsCount,
		views: user.views || 0, // Add views from the user record, default to 0 if undefined
		praises: user.praises || 0 // Add praises from the user record, default to 0 if undefined
	};

	return { userStats, links, form: await superValidate(zod(linksSchema)) };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(linksSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { title, url } = form.data;

		if (user) {
			try {
				await prisma.link.create({
					data: {
						title,
						url,
						userId: user.githubId
					}
				});
			} catch (error) {
				console.error(error);
				throw Error('Failed to create link');
			}
		}

		return {
			form
		};
	}
};
