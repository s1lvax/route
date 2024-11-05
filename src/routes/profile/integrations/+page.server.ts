import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { linksSchema } from '$lib/schemas/links';
import { redirect } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { createRecentActivity } from '$lib/utils/createRecentActivity';
import { unlinkSpotify } from '$lib/utils/spotify/unlinkSpotify';
import { chessComSchema } from '$lib/schemas/integration-chesscom';
import { leetCodeSchema } from '$lib/schemas/integration-leetcode'; 

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
	createLink: async (event) => {
		const form = await superValidate(event, zod(linksSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { title, url, order } = form.data;

		if (user) {
			try {
				const linkCount = await prisma.link.count({ where: { userId: user.githubId } });
				if (linkCount >= 15) {
					return fail(400, { form, message: 'You have reached the maximum limit of 15 links.' });
				}
				await prisma.link.create({
					data: {
						title,
						url,
						userId: user.githubId,
						order
					}
				});

				//add the link creation to the recent activity of the user
				createRecentActivity('LINK_CREATED', `Added a link (${title})`, user.githubId);
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

				//add the link deletion to the recent activity of the user
				createRecentActivity('LINK_DELETED', 'Deleted a link', user.githubId);
			}
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Something went wrong.' });
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
	},
	createChessCom: async (event) => {
		const form = await superValidate(event, zod(chessComSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { username } = form.data;

		if (user) {
			try {
				await prisma.integrationChessCom.create({
					data: {
						username,
						userId: user.githubId
					}
				});

				//add the chess com creation to the recent activity of the user
				createRecentActivity(
					'CHESS_COM_CREATED',
					`Linked your Chess.com account (${username})`,
					user.githubId
				);
			} catch (error) {
				console.error(error);
				throw Error('Failed to create hobby');
			}
		}

		return {
			form
		};
	},
	deleteChessCom: async ({ url }) => {
		//delete chess com
		try {
			if (user) {
				await prisma.integrationChessCom.delete({
					where: {
						userId: user.githubId
					}
				});

				//add the chess com deletion to the recent activity of the user
				createRecentActivity('CHESS_COM_DELETED', `Unlinked your Chess.com accont`, user.githubId);
			}
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	},


	createLeetCode: async (event) => {
		const form = await superValidate(event, zod(leetCodeSchema));
		if (!form.valid) return fail(400, { form });
	
		const { username } = form.data;
	
		if (user) {
		  try {
			await prisma.integrationLeetCode.create({
			  data: {
				username,
				userId: user.githubId
			  }
			});
	
			createRecentActivity(
			  'LEETCODE_LINKED',
			  `Linked your LeetCode account (${username})`,
			  user.githubId
			);
		  } catch (error) {
			console.error(error);
			throw new Error('Failed to create LeetCode integration');
		  }
		}
		return { form };
	  },
	  
	  deleteLeetCode: async ({ url }) => {
		try {
		  if (user) {
			await prisma.integrationLeetCode.delete({
			  where: { userId: user.githubId }
			});
	
			createRecentActivity('LEETCODE_UNLINKED', `Unlinked your LeetCode account`, user.githubId);
		  }
		} catch (error) {
		  console.error(error);
		  return fail(500, { message: 'Something went wrong.' });
		}
	  }
	

	


};
