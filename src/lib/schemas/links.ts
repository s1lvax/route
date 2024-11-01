import { z } from 'zod';

export const linksSchema = z.object({
	title: z.string().min(1).max(50),
	url: z
		.string()
		.min(1)
		.max(200)
		.url()
		.refine((val) => val.startsWith('http://') || val.startsWith('https://'), {
			message: 'Oops! URLs usually start with http:// or https:// :P'
		}),
	order: z.number()
});

export type LinksSchema = typeof linksSchema;
