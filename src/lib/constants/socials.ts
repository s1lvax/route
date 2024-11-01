// Social media
// Import to add differences in how they're handled in the frontend

// To be adjusted if we ever need more input types for socials
export enum SocialsInputType {
	URL = 'Social URL',
	USERNAME = 'Social Username'
}

//If the user should be redirected to a profile, make redirect true if not make redirect false and it will copy the contents to the clipboard
export const socials = [
	{
		name: 'Discord',
		redirect: false,
		inputType: SocialsInputType.USERNAME,
		domains: ['discord.com']
	},
	{
		name: 'LinkedIn',
		redirect: true,
		inputType: SocialsInputType.URL,
		domains: ['linkedin.com']
	},
	{
		name: 'Telegram',
		redirect: false,
		inputType: SocialsInputType.USERNAME,
		domains: ['t.me']
	},
	{
		name: 'Spotify',
		redirect: true,
		inputType: SocialsInputType.URL,
		domains: ['spotify.com']
	},
	{
		name: 'Gitlab',
		redirect: true,
		inputType: SocialsInputType.URL,
		domains: ['gitlab.com']
	}
];
