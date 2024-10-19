import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import type { Skill } from '@prisma/client/wasm';

export const PATCH: RequestHandler = async (event) => {
	const json = await event.request.json();
	const skills: Skill[] = json.skills;

	skills.forEach(async (skill, idx) => {
		await prisma.skill.update({
			where: {
				id: skill.id
			},
			data: {
				order: idx
			}
		});
	});

	return new Response();
};
