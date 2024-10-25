import { socials as socialIcons } from '$lib/constants/socials';

// function to find the matching svg
export const findSocialSvg = (socialName: string) => {
	const social = socialIcons.find((s) => s.name.toLowerCase() === socialName.toLowerCase());
	return social ? social.svg : '<svg><path d="M0 0" /></svg>';
};
