// src/routes/api/spotify/currently-listening/[githubUsername]/+server.ts
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { refreshSpotifyToken } from '$lib/utils/spotify/refreshSpotifyToken';
import { fetchSpotifyCurrentlyPlaying } from '$lib/utils/spotify/fetchSpotifyCurrentlyPlaying';

export const GET = async ({ params }) => {
	const { githubUsername } = params;

	// Fetch the user and Spotify tokens from the database
	const user = await prisma.user.findUnique({
		where: { githubUsername },
		include: { spotifyToken: true }
	});

	if (!user || !user.spotifyToken) {
		return json({ error: 'User or Spotify token not found' }, { status: 404 });
	}

	const { accessToken, refreshToken, expiresAt } = user.spotifyToken;

	// Check if the token is expired, and refresh if necessary
	let tokenToUse = accessToken;
	if (new Date() > expiresAt) {
		const refreshedTokens = await refreshSpotifyToken(refreshToken);
		if (!refreshedTokens) {
			return json({ error: 'Failed to refresh Spotify token' }, { status: 401 });
		}

		// Update the tokens in the database
		await prisma.spotifyToken.update({
			where: { userId: user.id },
			data: {
				accessToken: refreshedTokens.access_token,
				refreshToken: refreshedTokens.refresh_token || refreshToken,
				expiresAt: new Date(Date.now() + refreshedTokens.expires_in * 1000)
			}
		});

		tokenToUse = refreshedTokens.access_token;
	}

	// Fetch the currently playing song from Spotify
	const currentlyPlaying = await fetchSpotifyCurrentlyPlaying(tokenToUse);

	if (!currentlyPlaying) {
		// Instead of returning a 204, return a 200 status with a message indicating no track is playing
		return json({ message: 'No track currently playing' }, { status: 200 });
	}

	// Return the currently playing song
	return json(currentlyPlaying);
};
