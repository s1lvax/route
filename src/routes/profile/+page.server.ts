import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getGithubUsername } from '$lib/utils/getGithubUsername';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { prisma } from '$lib/server/prisma';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { linksSchema } from '$lib/schemas/links';
import type { User } from '$lib/types/User';
import { skillsSchema } from '$lib/schemas/skills';
import { deleteUser } from '$lib/utils/deleteUser';

// Define the user variable with a possible null
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

	// If the user does not exist, create a new user
	if (!user) {
		const username = await getGithubUsername(session.user.image);
		if (!username) throw new Error('Username could not be determined from image URL');

		// Create new user in the database
		user = await prisma.user.create({
			data: {
				githubId: userId,
				githubUsername: username,
				updatedAt: new Date()
			}
		});
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
	const userData = {
		username: user.githubUsername,
		views: user.views || 0
	};

	// Initialize forms using superValidate
	const linksForm = await superValidate(zod(linksSchema));
	const skillsForm = await superValidate(zod(skillsSchema));

	// Return data to the frontend
	return {
		userId: user.id,
		userData,
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
	},
	deleteAccount: async ({ url }) => {
		//get user id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete user
		if (user) {
			try {
				//make sure it's the correct user
				deleteUser(user.githubId, Number(id));
			} catch (error) {
				console.log(error);
				throw Error('Failed to delete user');
			}
		}
		throw redirect(303, '/');
	}
};
