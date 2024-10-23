import { prisma } from '$lib/server/prisma';

export const deleteUser = async (githubId: number, userId: number) => {
	try {
		//delete all the links of the user
		await prisma.link.deleteMany({
			where: { userId: githubId }
		});

		//delete all the skills
		await prisma.skill.deleteMany({
			where: { userId: githubId }
		});

		//delete all the hobbies
		await prisma.hobby.deleteMany({
			where: { userId: githubId }
		});

		//delete all the spotify tokens
		await prisma.spotifyToken.deleteMany({
			where: { userId: githubId }
		});

		//delete the user
		await prisma.user.delete({
			where: { githubId, id: userId }
		});
	} catch (error) {
		console.error(error);
		throw Error('Failed to delete user');
	}
};
