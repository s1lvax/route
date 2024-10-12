import { z } from 'zod';

export const linksSchema = z.object({
	title: z.string().min(1).max(50),
	url: z
		.string()
		.min(10)
		.max(200)
		.refine((val) => val.startsWith('http://') || val.startsWith('https://'), {
			message: 'Oops! URLs usually start with http:// or https:// :P'
		})
});

export type LinksSchema = typeof linksSchema;
