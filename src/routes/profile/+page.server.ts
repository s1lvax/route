import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { User } from '@prisma/client';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import type { PageServerLoad } from './$types';

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

	//fetch recent activity
	const recentActivity = await prisma.recentActivity.findMany({
		where: { userId: userId },
		orderBy: { createdAt: 'desc' },
		take: 5
	});

	return { recentActivity };
};
