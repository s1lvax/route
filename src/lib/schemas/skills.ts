import { z } from 'zod';

export const skillsSchema = z.object({
	title: z.string().min(1).max(50),
	level: z.string()
});

export type SkillsSchema = typeof skillsSchema;
