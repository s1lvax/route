import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { socialsSchema } from '$lib/schemas/socials';
import type { User } from '@prisma/client';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { hobbiesSchema } from '$lib/schemas/hobbies';

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
};

export const actions: Actions = {
	createSocial: async (event) => {
		const form = await superValidate(event, zod(socialsSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { social, socialURL } = form.data;

		if (user) {
			try {
				await prisma.social.create({
					data: {
						social,
						socialURL,
						userId: user.githubId
					}
				});
			} catch (error) {
				console.error(error);
				throw Error('Failed to create social');
			}
		}

		return {
			form
		};
	},
	deleteSocial: async ({ url }) => {
		//get hobby id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete social
		try {
			if (user) {
				await prisma.social.delete({
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
	createHobby: async (event) => {
		const form = await superValidate(event, zod(hobbiesSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { hobby } = form.data;

		if (user) {
			try {
				await prisma.hobby.create({
					data: {
						hobby,
						userId: user.githubId
					}
				});
			} catch (error) {
				console.error(error);
				throw Error('Failed to create hobby');
			}
		}

		return {
			form
		};
	},
	deleteHobby: async ({ url }) => {
		//get hobby id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete hobby
		try {
			if (user) {
				await prisma.hobby.delete({
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
