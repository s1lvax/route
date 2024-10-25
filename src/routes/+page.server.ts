import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	//fetch 5 users with the most views
	const users = await prisma.user.findMany({
		take: 6,
		orderBy: {
			views: 'desc'
		}
	});

	return {
		users
	};
};
