// src/lib/utils/spotify/refreshSpotifyToken.ts
export const refreshSpotifyToken = async (refreshToken: string) => {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
			).toString('base64')}`
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
