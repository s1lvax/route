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
import { skillsSchema } from '$lib/schemas/skills';
import { formatDate } from '$lib/utils/formatDate';

// Define the user variable with a possible null type
let user: User | null = null;

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	const userId = getGitHubUserIdFromImageUrl(session.user.image);
	if (!userId) throw new Error('User ID could not be determined from image URL');

	// Fetch the user from the database
	user = await prisma.user.findUnique({
		where: { githubId: userId }
	});

	let repoCount = 0;
	let contributionsCount = 0;

	// If the user does not exist, create a new user
	if (!user) {
		const username = await getGithubUsername(session.user.image);
		if (!username) throw new Error('Username could not be determined from image URL');

		// Fetch repository and contributions count
		repoCount = await countGithubProjects(username);
		contributionsCount = await fetchGitHubContributionsCount(username);

		// Create new user in the database
		user = await prisma.user.create({
			data: {
				githubId: userId,
				githubUsername: username,
				pfp: session.user.image,
				repoCount,
				contributionsCount,
				updatedAt: new Date()
			}
		});
	} else {
		// Update profile picture if necessary
		if (!user.pfp || user.pfp !== session.user.image) {
			await prisma.user.update({
				where: { githubId: userId },
				data: { pfp: session.user.image }
			});
		}

		const now = new Date();
		const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

		// Fetch new counts if `updatedAt` is older than 10 minutes
		if (!user.updatedAt || user.updatedAt < tenMinutesAgo) {
			repoCount = await countGithubProjects(user.githubUsername);
			contributionsCount = await fetchGitHubContributionsCount(user.githubUsername);

			await prisma.user.update({
				where: { githubId: userId },
				data: {
					repoCount,
					contributionsCount,
					updatedAt: now
				}
			});

			// Update user object with new values
			user.repoCount = repoCount;
			user.contributionsCount = contributionsCount;
			user.updatedAt = now;
		} else {
			// Use existing counts if recently updated
			repoCount = user.repoCount;
			contributionsCount = user.contributionsCount;
		}
	}

	// Ensure user is not null before accessing properties
	if (!user) throw new Error('User creation failed or user is null');

	// Fetch links and skills related to the user
	const links = await prisma.link.findMany({
		where: { userId: user.githubId }
	});

	const skills = await prisma.skill.findMany({
		where: { userId: user.githubId }
	});

	// Create userStats object
	const userStats = {
		repoCount: user.repoCount,
		contributionsCount: user.contributionsCount,
		views: user.views || 0,
		praises: user.praises || 0,
		lastUpdatedAt: formatDate(user.updatedAt)
	};

	// Initialize forms using superValidate
	const linksForm = await superValidate(zod(linksSchema));
	const skillsForm = await superValidate(zod(skillsSchema));

	// Return data to the frontend
	return {
		userStats,
		links,
		skills,
		form: linksForm,
		skillsForm: skillsForm
	};
};

export const actions: Actions = {
	createLink: async (event) => {
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
	},
	deleteLink: async ({ url }) => {
		//get link id from url
		const id = url.searchParams.get('id');

		//if no link is found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete tasks
		try {
			if (user) {
				await prisma.link.delete({
					where: {
						id: Number(id),
						userId: user.githubId
					}
				});
			}
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	},
	createSkill: async (event) => {
		const form = await superValidate(event, zod(skillsSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { title, level } = form.data;

		if (user) {
			try {
				await prisma.skill.create({
					data: {
						title,
						level,
						userId: user.githubId
					}
				});
			} catch (error) {
				console.error(error);
				throw Error('Failed to create skill');
			}
		}

		return {
			form
		};
	},
	deleteSkill: async ({ url }) => {
		//get skill id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete skill
		try {
			if (user) {
				await prisma.skill.delete({
					where: {
						id: Number(id),
						userId: user.githubId
					}
				});
			}
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	}
};
