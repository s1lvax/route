import { SPOTIFY_ID, SPOTIFY_SECRET } from '$env/static/private';

export const refreshSpotifyToken = async (refreshToken: string) => {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString('base64')}`
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		})
	});

	if (!response.ok) {
		console.error('Failed to refresh Spotify token:', response.statusText);
		return null;
	}

	return await response.json();
};
