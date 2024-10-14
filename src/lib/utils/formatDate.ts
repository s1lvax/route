export const formatDate = (dateInput: Date | string): string => {
	// If input is a string, convert it to a Date object
	const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

	// Ensure the input is a valid date
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date');
	}

	// Return formatted date and time
	return date.toLocaleString();
};
