import { toast } from 'svelte-sonner';

export const copyToClipboard = (url: string) => {
	navigator.clipboard
		.writeText(url)
		.then(() => {
			console.log('Link copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy: ', err);
		});

	toast.success('Link has been copied.', {
		description: url,
		action: {
			label: 'Undo',
			onClick: () => console.info('Undo')
		}
	});
};
