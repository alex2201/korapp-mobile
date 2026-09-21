import { z } from 'zod';

export const accountStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
]);

export const accountUserSchema = z.object({
  id: z.number().int().positive(),
  publicId: z.string().min(1),
  firebaseUid: z.string().min(1),
  pharmacyId: z.number().int().positive(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  phone: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  status: accountStatusSchema,
  roles: z.array(z.string()),
  lastLoginAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});

export const verifyTokenDataSchema = z.object({
  user: accountUserSchema,
  permissions: z.array(z.string()),
  roles: z.array(z.string()),
});

export const verifyTokenResponseSchema = z.object({
  success: z.boolean(),
  data: verifyTokenDataSchema,
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export const accountSchema = accountUserSchema.extend({
  permissions: z.array(z.string()),
});

export type AccountStatus = z.infer<typeof accountStatusSchema>;
export type AccountUser = z.infer<typeof accountUserSchema>;
export type VerifyTokenData = z.infer<typeof verifyTokenDataSchema>;
export type VerifyTokenResponse = z.infer<typeof verifyTokenResponseSchema>;
export type Account = z.infer<typeof accountSchema>;
