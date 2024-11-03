import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import { socialsSchema } from '$lib/schemas/socials';
import type { User } from '@prisma/client';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { hobbiesSchema } from '$lib/schemas/hobbies';
import { createRecentActivity } from '$lib/utils/createRecentActivity';
import { personalInformationSchema } from '$lib/schemas/personal-information';
import { cryptoSchema } from '$lib/schemas/crypto';

// Define the user variable with a possible null
let user: User | null = null;

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	const userId = getGitHubUserIdFromImageUrl(session.user.image);
	if (!userId) throw new Error('User ID could not be determined from image URL');

	// Fetch the user from the database
	user = await prisma.user.findUnique({
		where: { githubId: userId }
	});
};

export const actions: Actions = {
	createSocial: async (event) => {
		const form = await superValidate(event, zod(socialsSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { social, socialURL } = form.data;

		if (user) {
			try {
				await prisma.social.create({
					data: {
						social,
						socialURL,
						userId: user.githubId
					}
				});

				//add the social creation to the recent activity of the user
				createRecentActivity('SOCIAL_CREATED', `Added a ${social} account`, user.githubId);
			} catch (error) {
				console.error(error);
				throw Error('Failed to create social');
			}
		}

		return {
			form
		};
	},
	deleteSocial: async ({ url }) => {
		//get hobby id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete social
		try {
			if (user) {
				await prisma.social.delete({
					where: {
						id: Number(id),
						userId: user.githubId
					}
				});

				//add the social deletion to the recent activity of the user
				createRecentActivity('SOCIAL_DELETED', `Deleted a social account`, user.githubId);
			}
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	},
	createHobby: async (event) => {
		const form = await superValidate(event, zod(hobbiesSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { hobby } = form.data;

		if (user) {
			try {
				await prisma.hobby.create({
					data: {
						hobby,
						userId: user.githubId
					}
				});

				//add the hobby creation to the recent activity of the user
				createRecentActivity('HOBBY_CREATED', `Added a hobby (${hobby})`, user.githubId);
			} catch (error) {
				console.error(error);
				throw Error('Failed to create hobby');
			}
		}

		return {
			form
		};
	},
	deleteHobby: async ({ url }) => {
		//get hobby id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete hobby
		try {
			if (user) {
				await prisma.hobby.delete({
					where: {
						id: Number(id),
						userId: user.githubId
					}
				});

				//add the hobby deletion to the recent activity of the user
				createRecentActivity('HOBBY_DELETED', `Deleted a hobby`, user.githubId);
			}
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	},
	updatePersonalInformation: async (event) => {
		const form = await superValidate(event, zod(personalInformationSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { email, fullName } = form.data;

		if (user) {
			try {
				// The upsert/update method doesn't update a field if it is undefined
				// By doing ...(email && { email }), empty strings and null values will be turned into undefined
				await prisma.personalInformation.upsert({
					where: {
						userId: user.githubId
					},
					update: {
						...(email && { email }),
						...(fullName && { fullName })
					},
					create: {
						userId: user.githubId
					}
				});
				createRecentActivity(
					'PERSONAL_INFORMATION_UPDATED',
					`Updated personal information`,
					user.githubId
				);
			} catch (error) {
				console.error(error);
				throw Error('Failed to update personal information');
			}
		}

		return {
			form
		};
	},
	resetPersonalInformation: async ({ url }) => {
		const field = url.searchParams.get('field');
		const isValidField =
			field != null &&
			Object.keys(prisma.personalInformation.fields).includes(field) &&
			field != 'id' &&
			field != 'userId';

		if (!isValidField) {
			return fail(400, { message: 'Invalid request' });
		}

		try {
			if (user) {
				const update: Record<string, string> = {};
				update[field] = '';

				await prisma.personalInformation.upsert({
					where: {
						userId: user.githubId
					},
					update,
					create: {
						userId: user.githubId
					}
				});

				createRecentActivity(
					'PERSONAL_INFORMATION_UPDATED',
					`Updated personal information`,
					user.githubId
				);
			}
		} catch (error) {
			console.error(error);
			throw Error('Failed to update personal information');
		}
	},
	createCrypto: async (event) => {
		const form = await superValidate(event, zod(cryptoSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// If no errors, get data
		const { cryptoName, wallet } = form.data;

		if (user) {
			try {
				const existingCrypto = await prisma.cryptoWallets.findFirst({
					where: {
						cryptoName,
						userId: user.githubId
					}
				});

				if (existingCrypto) {
					// Update if the wallet already exists
					await prisma.cryptoWallets.update({
						where: { id: existingCrypto.id },
						data: {
							wallet: wallet
						}
					});
					//update the crypto creation to the recent activity of the user
					createRecentActivity(
						'CRYPTO_CREATED',
						`Updated your ${cryptoName} wallet`,
						user.githubId
					);
				} else {
					// Create a new wallet if it doesn't exist
					await prisma.cryptoWallets.create({
						data: {
							cryptoName: cryptoName,
							wallet: wallet,
							userId: user.githubId
						}
					});

					//add the crypto creation to the recent activity of the user
					createRecentActivity(
						'CRYPTO_CREATED',
						`Add your ${cryptoName} address to the footer`,
						user.githubId
					);
				}
			} catch (error) {
				console.error(error);
				throw Error('Failed to create social');
			}
		}

		return {
			form
		};
	},
	deleteCrypto: async ({ url }) => {
		//get hobby id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete social
		try {
			if (user) {
				await prisma.cryptoWallets.delete({
					where: {
						id: Number(id),
						userId: user.githubId
					}
				});

				//add the social deletion to the recent activity of the user
				createRecentActivity(
					'CRYPTO_DELETED',
					`Removed crypto address from your footer`,
					user.githubId
				);
			}
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	}
};
