import { prisma } from '$lib/server/prisma';
import { createRecentActivity } from './createRecentActivity';

export const updateOpenToCollaborating = async (githubId: number) => {
	try {
		// fetch current state
		const user = await prisma.user.findUnique({
			where: { githubId: githubId },
			select: { openToCollaborating: true }
		});

		if (!user) {
			throw new Error('User not found');
		}

		// generate new value
		const newOpenToCollaboratingValue = !user.openToCollaborating;

		// update db
		await prisma.user.update({
			where: { githubId: githubId },
			data: { openToCollaborating: newOpenToCollaboratingValue }
		});

		//update the recent activity of the user
		createRecentActivity(
			'UPDATE_OTC',
			`Open to Collaborating set to ${newOpenToCollaboratingValue}`,
			githubId
		);
	} catch (error) {
		console.error(error);
		throw new Error('Failed to update openToCollaborating status');
	}
};
