import { prisma } from '$lib/server/prisma';

export const createRecentActivity = async (
	activityType:
		| 'LINK_CREATED'
		| 'LINK_DELETED'
		| 'HOBBY_CREATED'
		| 'HOBBY_DELETED'
		| 'SOCIAL_CREATED'
		| 'SOCIAL_DELETED'
		| 'UPDATE_OTC'
		| 'UNLINK_SPOTIFY'
		| 'LINK_SPOTIFY'
		| 'SKILL_CREATED'
		| 'SKILL_DELETED'
		| 'CHESS_COM_CREATED'
		| 'CHESS_COM_DELETED'
		| 'PERSONAL_INFORMATION_UPDATED',
	activityDescription: string,
	userId: number
): Promise<void> => {
	await prisma.recentActivity.create({
		data: {
			activityType: activityType,
			activityDescription: activityDescription,
			userId: userId
		}
	});
};
