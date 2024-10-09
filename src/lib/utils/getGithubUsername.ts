export const getGithubUsername = async (
	imageUrl: string | null | undefined
): Promise<string | null> => {
	const getGitHubUserIdFromImageUrl = (url: string | null | undefined): number | null => {
		if (!url) return null; // Check if imageUrl is not null or undefined
		const regex = /\/u\/(\d+)/; // Match the pattern /u/ followed by digits
		const match = url.match(regex);
		return match ? Number(match[1]) : null; // Return the matched user ID or null
	};

	const userId = getGitHubUserIdFromImageUrl(imageUrl); // Extract user ID from image URL

	if (!userId) {
		throw new Error('User ID could not be determined from image URL');
	}

	const fetchGitHubUsernameById = async (id: number): Promise<string | null> => {
		const url = `https://api.github.com/user/${id}`;

		try {
			const response = await fetch(url, {
				method: 'GET'
			});

			if (!response.ok) {
				throw new Error(`Error fetching data: ${response.statusText}`);
			}

			const data = await response.json();
			return data.login || null; // Return the login (username) or null
		} catch (error) {
			console.error('Failed to fetch GitHub username:', error);
			throw error;
		}
	};

	// Fetch the username using the extracted user ID
	return await fetchGitHubUsernameById(userId);
};
