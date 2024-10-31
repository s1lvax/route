import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const username = params.username;

	if (!username) {
		throw new Error('Username is required');
	}

	const user = await prisma.user.findUnique({
		where: { githubUsername: username }
	});

	if (!user) {
		throw new Error('User not found');
	}

	//update view by one

	await prisma.user.update({
		where: { githubId: user.githubId },
		data: {
			views: user.views + 1
		}
	});

	const links = await prisma.link.findMany({
		where: { userId: user.githubId },
		orderBy: [{ order: 'asc' }]
	});

	const skills = await prisma.skill.findMany({
		where: { userId: user.githubId },
		orderBy: [{ order: 'asc' }]
	});

	const isOpenToCollaborating = await prisma.user.findUnique({
		where: { githubId: user.githubId },
		select: { openToCollaborating: true }
	});

	const hobbies = await prisma.hobby.findMany({
		where: { userId: user.githubId }
	});

	const socials = await prisma.social.findMany({
		where: { userId: user.githubId }
	});

	const chessCom = await prisma.integrationChessCom.findUnique({
		where: { userId: user.githubId }
	});

	const userData = {
		links,
		skills,
		socials,
		chessComUsername: chessCom ? chessCom.username : null,
		username: username,
		isOpenToCollaborating: isOpenToCollaborating?.openToCollaborating,
		hobbies
	};

	return {
		userData
	};
};
