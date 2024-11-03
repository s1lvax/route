import { prisma } from '$lib/server/prisma';
import { createRecentActivity } from '$lib/utils/createRecentActivity';

export const unlinkSpotify = async (githubId: number) => {
	try {
		// fetch current state
		const user = await prisma.user.findUnique({
			where: { githubId: githubId }
		});

		if (!user) {
			throw new Error('User not found');
		}

		// delete token from db
		await prisma.spotifyToken.delete({
			where: { userId: githubId }
		});

		//add unlink to recent activity
		createRecentActivity('UNLINK_SPOTIFY', 'Unlinked Spotify account', githubId);
	} catch (error) {
		console.error(error);
		throw new Error('Failed to delete Spotify');
	}
};
