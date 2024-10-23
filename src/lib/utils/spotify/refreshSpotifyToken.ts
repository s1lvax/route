import { SPOTIFY_ID, SPOTIFY_SECRET } from '$env/static/private';

export const refreshSpotifyToken = async (refreshToken: string) => {
	const authHeader = btoa(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`);

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${authHeader}`
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		})
	});

	if (!response.ok) {
		return null;
	}

	return await response.json();
};
