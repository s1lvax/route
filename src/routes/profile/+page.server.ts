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

// user
let user: User | null;

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	// Extract user ID from the image URL
	const userId = getGitHubUserIdFromImageUrl(session.user.image);

	if (!userId) {
		throw new Error('User ID could not be determined from image URL');
	}

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

	const repoCount = await countGithubProjects(user.githubUsername);

	const contributionsCount = await fetchGitHubContributionsCount(user.githubUsername);

	const links = await prisma.link.findMany({
		where: { userId: user.githubId } // Filter links by userId
	});

	const skills = await prisma.skill.findMany({
		where: { userId: user.githubId } // Filter links by userId
	});

	// Create the userStats object, including views and praises
	const userStats = {
		repoCount,
		contributionsCount,
		views: user.views || 0,
		praises: user.praises || 0
	};

	return {
		userStats,
		links,
		skills,
		form: await superValidate(zod(linksSchema)),
		skillsForm: await superValidate(zod(skillsSchema))
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
