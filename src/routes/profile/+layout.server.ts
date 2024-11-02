import { redirect } from '@sveltejs/kit';
import { getGithubUsername } from '$lib/utils/getGithubUsername';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { prisma } from '$lib/server/prisma';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { linksSchema } from '$lib/schemas/links';
import type { User } from '$lib/types/User';
import { skillsSchema } from '$lib/schemas/skills';
import { hobbiesSchema } from '$lib/schemas/hobbies';
import { socialsSchema } from '$lib/schemas/socials';
import { personalInformationSchema } from '$lib/schemas/personal-information';
import type { LayoutServerLoad } from '../$types';
import { chessComSchema } from '$lib/schemas/integration-chesscom';
import { cryptoSchema } from '$lib/schemas/crypto';

// Define the user variable with a possible null
let user: User | null = null;

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user) throw redirect(303, '/');

	const userId = getGitHubUserIdFromImageUrl(session.user.image);
	if (!userId) throw new Error('User ID could not be determined from image URL');

	// Fetch the user from the database
	user = await prisma.user.findUnique({
		where: { githubId: userId }
	});

	// If the user does not exist, create a new user
	if (!user) {
		const username = await getGithubUsername(session.user.image);
		if (!username) throw new Error('Username could not be determined from image URL');

		// Create new user in the database
		user = await prisma.user.create({
			data: {
				githubId: userId,
				githubUsername: username,
				updatedAt: new Date()
			}
		});
	}

	// Ensure user is not null before accessing properties
	if (!user) throw new Error('User creation failed or user is null');

	// Fetch links, skills, hobbies, spotifyTokens related to the user
	const links = await prisma.link.findMany({
		where: { userId: user.githubId },
		orderBy: [{ order: 'asc' }]
	});

	const skills = await prisma.skill.findMany({
		where: { userId: user.githubId },
		orderBy: [{ order: 'asc' }]
	});

	const spotifyToken = await prisma.spotifyToken.findFirst({
		where: { userId: user.githubId }
	});

	const hobbies = await prisma.hobby.findMany({
		where: { userId: user.githubId }
	});

	const personalInformation = await prisma.personalInformation.findFirst({
		where: { userId: user.githubId }
	});

	const socials = await prisma.social.findMany({
		where: { userId: user.githubId }
	});

	const chessComUsername = await prisma.integrationChessCom.findFirst({
		where: { userId: user.githubId }
	});

	// Create userStats object
	const userData = {
		username: user.githubUsername,
		views: user.views || 0,
		openToCollaborating: user.openToCollaborating
	};

	// Initialize forms using superValidate
	const linksForm = await superValidate(zod(linksSchema));
	const skillsForm = await superValidate(zod(skillsSchema));
	const hobbiesForm = await superValidate(zod(hobbiesSchema));
	const socialsForm = await superValidate(zod(socialsSchema));
	const personalInformationForm = await superValidate(zod(personalInformationSchema));
	const chessComForm = await superValidate(zod(chessComSchema));
	const cryptoForm = await superValidate(zod(cryptoSchema));

	// Return data to the frontend
	return {
		userId: user.id,
		userData,
		links,
		skills,
		hobbies,
		personalInformation,
		socials,
		spotifyToken,
		chessComUsername,
		form: linksForm,
		skillsForm,
		hobbiesForm,
		socialsForm,
		personalInformationForm,
		chessComForm,
		cryptoForm
	};
};
