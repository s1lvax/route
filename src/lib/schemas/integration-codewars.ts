import { z } from 'zod';

export const codewarsSchema = z.object({
    username: z.string().min(3).max(20)
});

export type CodewarsSchema = typeof codewarsSchema;