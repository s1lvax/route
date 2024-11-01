import { z } from 'zod';

export const personalInformationSchema = z.object({
  email: z.string().email().nullable(),
  fullName: z.string().nullable()
});

export type PersonalInformationSchema = typeof personalInformationSchema;
