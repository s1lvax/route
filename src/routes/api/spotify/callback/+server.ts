import type { RequestHandler } from './$types';
import { json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma'; // Import Prisma client

import { SPOTIFY_ID, SPOTIFY_REDIRECT, SPOTIFY_SECRET } from '$env/static/private';
import { getGitHubUserIdFromImageUrl } from '$lib/utils/getGithubIDFromImage';
import { createRecentActivity } from '$lib/utils/createRecentActivity';

//Token URL
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// error if no code returns (spotify docs)
	if (!code) {
		return json({ error: 'Missing authorization code' }, { status: 400 });
	}

	//make sure an user exists
	const session = await locals.auth();
	if (!session?.user) throw redirect(303, '/');

	//use our image strategy to get the user Id
	const userId = getGitHubUserIdFromImageUrl(session.user.image);

	// exchange the authorization code for an access token and refresh token
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: SPOTIFY_REDIRECT,
		client_id: SPOTIFY_ID,
		client_secret: SPOTIFY_SECRET
	});

	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});

	const tokenData = await response.json();

	if (tokenData.access_token && tokenData.refresh_token) {
		const accessToken = tokenData.access_token;
		const refreshToken = tokenData.refresh_token;
		const expiresIn = tokenData.expires_in;

		const expiresAt = new Date(Date.now() + expiresIn * 1000); // Calculate token expiration time

		// Upsert tokens into the Prisma database (insert if not exists, otherwise update)
		if (userId) {
			await prisma.spotifyToken.upsert({
				where: { userId: userId },
				update: {
					accessToken,
					refreshToken,
					expiresAt
				},
				create: {
					userId,
					accessToken,
					refreshToken,
					expiresAt
				}
			});

			//update to recent activity
			createRecentActivity('LINK_SPOTIFY', 'Linked Spotify account', userId);
		}

		throw redirect(302, '/profile');
	} else {
		return json({ error: 'Failed to get tokens from Spotify' }, { status: 400 });
	}
};
