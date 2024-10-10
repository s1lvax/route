// Function to fetch GitHub contributions count (events)
export const fetchGitHubContributionsCount = async (username: string): Promise<number> => {
	const url = `https://api.github.com/users/${username}/events`;

	try {
		const response = await fetch(url, {
			method: 'GET'
		});

		if (!response.ok) {
			throw new Error(`Error fetching data: ${response.statusText}`);
		}

		const data = await response.json();

		// Return the count of contributions
		return data.length;
	} catch (error) {
		console.error('Failed to fetch GitHub contributions:', error);
		throw error;
	}
};
