import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Fetch 6 random users
	const users = await prisma.user.findMany({
		take: 6,
		orderBy: {
			id: 'asc'
		},
		where: {
			id: {
				in: (
					await prisma.user.findMany({
						select: { id: true },
						orderBy: {
							id: 'asc'
						}
					})
				).map((user) => user.id)
			}
		}
	});

	return {
		users
	};
};
