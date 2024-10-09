export const formatDate = (dateInput: Date | string): string => {
	// If input is a string, convert it to a Date object
	const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

	// Ensure the input is a valid date
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date');
	}

	// Extract the year, month, day, hours, and minutes
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0'); // Hours in 24-hour format
	const minutes = String(date.getMinutes()).padStart(2, '0');

	// Return formatted date and time
	return `${year}-${month}-${day} ${hours}:${minutes}`;
};
