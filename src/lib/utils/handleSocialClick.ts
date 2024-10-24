import { socials as socialMediaList } from '$lib/constants/socials';
import type { Social } from '@prisma/client';
import { copyToClipboard } from './copyToClipboard';

const findSocial = (socialName: string) => {
	return socialMediaList.find((social) => social.name === socialName);
};

export const handleSocialClick = (social: Social) => {
	const socialData = findSocial(social.social);

	if (socialData && socialData.redirect) {
		//if redirect is true, open the URL in a new tab
		window.open(social.socialURL, '_blank');
	} else if (socialData) {
		copyToClipboard(social.socialURL);
	}
};
