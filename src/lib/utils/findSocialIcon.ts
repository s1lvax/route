import { socials as socialIcons } from '$lib/constants/socials';
import { IconQuestionMark } from '@tabler/icons-svelte';

export const findSocialIcon = (socialName: string) => {
	const social = socialIcons.find((s) => s.name.toLowerCase() === socialName.toLowerCase());
	return social ? social.icon : IconQuestionMark;
};
