import type { User } from '@prisma/client';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { prisma } from '$lib/server/prisma';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { skillsSchema } from '$lib/schemas/skills';
import { createRecentActivity } from '$lib/utils/createRecentActivity';

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
	createSkill: async (event) => {
		const form = await superValidate(event, zod(skillsSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { title, level, order } = form.data;

		if (user) {
			try {
				const skillCount = await prisma.skill.count({ where: { userId: user.githubId } });
				if (skillCount >= 15) {
					return fail(400, { form, message: 'You have reached the maximum limit of 15 skills' });
				}
				await prisma.skill.create({
					data: {
						title,
						level,
						userId: user.githubId,
						order
					}
				});

				//add the skill creation to the recent activity of the user
				createRecentActivity('SKILL_CREATED', `Added a skill (${title})`, user.githubId);
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

				//add the skill deletion to the recent activity of the user
				createRecentActivity('SKILL_DELETED', `Deleted a skill`, user.githubId);
			}
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	}
};
