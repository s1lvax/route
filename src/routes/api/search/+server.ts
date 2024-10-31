import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const searchText = url.searchParams.get('searchText') || ''; // Fallback to an empty string

	const result = await prisma.user.findMany({
		where: {
			OR: [
				{
					githubUsername: {
						contains: searchText,
						mode: 'insensitive'
					}
				},
				{
					Skill: {
						some: {
							title: {
								contains: searchText,
								mode: 'insensitive'
							}
						}
					}
				},
				{
					Hobby: {
						some: {
							hobby: {
								contains: searchText,
								mode: 'insensitive'
							}
						}
					}
				}
			]
		},
		include: {
			Skill: true,
			Hobby: true
		}
	});

	return new Response(JSON.stringify(result), {
		headers: { 'Content-Type': 'application/json' }
	});
};
