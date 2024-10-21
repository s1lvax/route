import { prisma } from '$lib/server/prisma';

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
	} catch (error) {
		console.log(error);
		throw new Error('Failed to update openToCollaborating status');
	}
};
