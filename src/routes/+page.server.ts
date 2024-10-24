import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	//fetch 6 random users
	const userCount = await prisma.user.count();
	const skip = Math.floor(Math.random() * userCount);
	const users = await prisma.user.findMany({
		take: 6,
		skip: skip,
		orderBy: {
			id: 'desc'
		}
	});

	return {
		users
	};
};
