import { SPOTIFY_ID } from '$env/static/private';

export const refreshSpotifyToken = async (refreshToken: string) => {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: SPOTIFY_ID
		})
	});

	if (!response.ok) {
		console.error('Failed to refresh Spotify token:', response.statusText);
		return null;
	}

	return await response.json();
};
