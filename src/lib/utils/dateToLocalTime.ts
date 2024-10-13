export const dateToLocalTime = (dateInput: Date | string): Date => {
  const MILLISECONDS_PER_MINUTE = 60000;

  // If input is a string, convert it to a Date object
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Ensure the input is a valid date
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  return new Date(date.getTime() + date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE);
};
