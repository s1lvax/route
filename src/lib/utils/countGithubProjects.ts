export const countGithubProjects = async (username: string): Promise<number> => {
	const url = `https://api.github.com/users/${username}/repos`;

	try {
		const response = await fetch(url, {
			method: 'GET'
		});

		// check response
		if (!response.ok) {
			throw new Error(`Error fetching data: ${response.statusText}`);
		}

		const data = await response.json();

		// Return the count of repositories
		return data.length;
	} catch (error) {
		console.error('Failed to fetch GitHub repository count:', error);
		throw error;
	}
};
