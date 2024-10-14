export const confirmDelete = (event: Event) => {
	const confirmed = confirm('Are you sure ?');
	if (!confirmed) {
		//prevent form submission if the user does not confirm
		event.preventDefault();
	}
};
