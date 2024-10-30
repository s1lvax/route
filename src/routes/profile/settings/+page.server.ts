import type { Actions, PageServerLoad } from './$types';
import { deleteUser } from '$lib/utils/deleteUser';
import { unlinkSpotify } from '$lib/utils/spotify/unlinkSpotify';
import { updateOpenToCollaborating } from '$lib/utils/updateOpenToCollaborating';
import { fail } from 'sveltekit-superforms';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import type { User } from '@prisma/client';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

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
				console.error(error);
				throw Error('Failed to delete user');
			}
		}

		throw redirect(303, '/');
	},
	updateOpenToCollaborating: async () => {
		//delete user
		if (user) {
			try {
				// update value
				updateOpenToCollaborating(user.githubId);
			} catch (error) {
				console.error(error);
				throw Error('Failed to delete user');
			}
		}
	},
	unlinkSpotify: async () => {
		if (user) {
			try {
				// delete
				unlinkSpotify(user.githubId);
			} catch (error) {
				console.error(error);
				throw Error('Failed to delete user');
			}
		}
	}
};
