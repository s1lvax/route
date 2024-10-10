// Function to convert skill level (string) into percentage for progress bar
export const getProgressValue = (level: string): number => {
	const levels: { [key: string]: number } = {
		'1': 20,
		'2': 40,
		'3': 60,
		'4': 80,
		'5': 100
	};
	return levels[level] || 0;
};
