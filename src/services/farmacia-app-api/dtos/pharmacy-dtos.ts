import { z } from 'zod';

export const pharmacyDtoSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  addressLine: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  logoUrl: z.string().nullable(),
  settings: z.unknown().nullable(),
  brandColor: z.string().nullable(),
  alertEmails: z.array(z.string()),
});

export const pharmacyResponseDtoSchema = z.object({
  success: z.boolean(),
  data: pharmacyDtoSchema,
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export type PharmacyDto = z.infer<typeof pharmacyDtoSchema>;
