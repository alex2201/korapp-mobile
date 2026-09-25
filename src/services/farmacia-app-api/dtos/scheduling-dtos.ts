import { z } from 'zod';

export const serviceDtoSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string().nullable(),
  durationMin: z.number().int().positive(),
  price: z.string().nullable(),
  colorHex: z.string().nullable(),
  isActive: z.boolean(),
});

export const servicesResponseDtoSchema = z.object({
  success: z.boolean(),
  data: z.array(serviceDtoSchema),
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export type ServiceDto = z.infer<typeof serviceDtoSchema>;
