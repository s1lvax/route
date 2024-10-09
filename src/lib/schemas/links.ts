import { z } from 'zod';

export const linksSchema = z.object({
	title: z.string().min(1).max(50),
	url: z.string().min(10).max(200)
});

export type LinksSchema = typeof linksSchema;
