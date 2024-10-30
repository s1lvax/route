import { SocialsInputType } from '$lib/constants/socials';
import { findSocial } from '$lib/utils/handleSocialClick';
import { z } from 'zod';

export const socialsSchema = z
	.object({
		social: z.string().min(1).max(60),
		socialURL: z.string().min(1).max(200)
	})
	.superRefine((obj, ctx) => {
		const socialObject = findSocial(obj.social);
		if (socialObject?.inputType !== SocialsInputType.URL) {
			return;
		}
		if (!obj.socialURL) return;

		const URLPattern = new RegExp(
			'(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})(\\.[a-zA-Z0-9]{2,})?'
		);

		const isUrlValid = URLPattern.test(obj.socialURL);

		if (!isUrlValid) {
			ctx.addIssue({
				code: z.ZodIssueCode.invalid_string,
				message: 'Invalid URL',
				path: ['socialURL'],
				validation: 'url'
			});
			return;
		}

		// cleanup the URL by adding https:// if it's not already there
		let url = obj.socialURL;

		if (!(url.startsWith('http://') || url.startsWith('https://'))) {
			url = 'https://' + url;
		}

		// extract the domain from the URL
		const domain = new URL(url).hostname;

		if (socialObject.domains.includes(domain)) {
			return true;
		}

		ctx.addIssue({
			code: z.ZodIssueCode.invalid_string,
			message: 'URL provided is not a valid domain for the selected social',
			validation: 'url',
			path: ['socialURL']
		});
	})
	.transform((data) => {
		if (findSocial(data.social)?.inputType !== SocialsInputType.URL) return data;

		// cleanup the URL by adding https:// if it's not already there
		if (!(data.socialURL.startsWith('http://') || data.socialURL.startsWith('https://'))) {
			data.socialURL = 'https://' + data.socialURL;
		}
		return data;
	});

export type SocialsSchema = typeof socialsSchema;
