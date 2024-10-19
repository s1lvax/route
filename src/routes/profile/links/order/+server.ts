import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import type { Link } from '@prisma/client/wasm';

export const PATCH: RequestHandler = async (event) => {
	const json = await event.request.json();
	const links: Link[] = json.links;

	links.forEach(async (link, idx) => {
		await prisma.link.update({
			where: {
				id: link.id
			},
			data: {
				order: idx
			}
		});
	});

	return new Response();
};
