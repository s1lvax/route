import { z } from 'zod';

export const socialsSchema = z.object({
	social: z.string().min(1).max(60),
	socialURL: z.string().min(1).max(200).url()
});

export type SocialsSchema = typeof socialsSchema;
