//Social media
// Import to add differences in how they're handled in the frontend

//If the user should be redirected to a profile, make redirect true if not make redirect false and it will copy the contents to the clipboard

import {
	IconBrandDiscord,
	IconBrandLinkedin,
	IconBrandTelegram,
	IconBrandSpotify,
	IconBrandGitlab
} from '@tabler/icons-svelte';

export const socials = [
	{
		name: 'Discord',
		icon: IconBrandDiscord,
		redirect: false
	},
	{
		name: 'LinkedIn',
		icon: IconBrandLinkedin,
		redirect: true
	},
	{
		name: 'Telegram',
		icon: IconBrandTelegram,
		redirect: false
	},
	{
		name: 'Spotify',
		icon: IconBrandSpotify,
		redirect: true
	},
	{
		name: 'Gitlab',
		icon: IconBrandGitlab,
		redirect: true
	}
];
