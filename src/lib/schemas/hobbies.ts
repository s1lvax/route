import { z } from 'zod';

export const hobbiesSchema = z.object({
    hobby: z.string().min(1).max(100),
});

export type HobbiesSchema = typeof hobbiesSchema;
