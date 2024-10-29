export const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export const fetchSpotifyCurrentlyPlaying = async (accessToken: string) => {
	const response = await fetch(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		}
	});

	if (response.status === 204 || !response.ok) {
		// Return null if no content (204) or if there's an error
		return null;
	}

	return await response.json();
};
