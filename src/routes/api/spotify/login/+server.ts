import { redirect, type RequestHandler } from '@sveltejs/kit';

import { SPOTIFY_ID, SPOTIFY_REDIRECT } from '$env/static/private';
import { generateRandomString } from '$lib/utils/spotify/generateRandomString';

const scope = 'user-read-currently-playing';

// SvelteKit endpoint
export const GET: RequestHandler = async () => {
	const state = generateRandomString(16);

	// Construct the Spotify authorization URL
	const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
		response_type: 'code',
		client_id: SPOTIFY_ID,
		scope,
		redirect_uri: SPOTIFY_REDIRECT,
		state
	}).toString()}`;

	throw redirect(302, authUrl);
};
