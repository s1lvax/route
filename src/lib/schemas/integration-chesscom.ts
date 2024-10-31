import { z } from 'zod';

export const chessComSchema = z.object({
	username: z.string().min(3).max(20)
});

export type ChessComSchema = typeof chessComSchema;
