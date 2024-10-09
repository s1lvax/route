export const getGitHubUserIdFromImageUrl = (url: string | null | undefined): number | null => {
	if (!url) return null; // Check if imageUrl is not null or undefined
	const regex = /\/u\/(\d+)/; // Match the pattern /u/ followed by digits
	const match = url.match(regex);
	return match ? Number(match[1]) : null; // Return the matched user ID or null
};
