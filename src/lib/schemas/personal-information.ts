import { z } from 'zod';

export const personalInformationSchema = z.object({
  email: z.string().email().max(64).nullable(),
  fullName: z.string().max(64).nullable()
});

export type PersonalInformationSchema = typeof personalInformationSchema;
