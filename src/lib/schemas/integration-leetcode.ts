import { z } from 'zod';

export const leetCodeSchema = z.object({
    username: z.string().min(3).max(20)
    });


export type LeetCodeSchema = typeof leetCodeSchema;



