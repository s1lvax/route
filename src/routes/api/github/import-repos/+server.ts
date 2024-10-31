import { redirect, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth();
	if (!session?.user) throw redirect(303, '/');

	const userId = getGitHubUserIdFromImageUrl(session.user.image);
	if (!userId) throw new Error('User ID could not be determined from image URL');

	try {
		// body
		const { links } = await request.json();

		// insert links into the db
		await prisma.link.createMany({
			data: links.map((link: { name: string; url: string }) => ({
				title: link.name,
				url: link.url,
				userId: userId
			}))
		});

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error saving links:', error);
		return new Response(JSON.stringify({ error: 'Failed to save links' }), { status: 500 });
	}
};
