import { z } from 'zod';

export const userProfileDtoSchema = z.object({
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
  status: z.enum(['active', 'inactive', 'suspended']),
  roles: z.array(z.string()),
  lastLoginAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});

export const verifyTokenDataDtoSchema = z.object({
  user: userProfileDtoSchema,
  permissions: z.array(z.string()),
  roles: z.array(z.string()),
});

export const verifyTokenResponseDtoSchema = z.object({
  success: z.boolean(),
  data: verifyTokenDataDtoSchema,
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export type UserProfileDto = z.infer<typeof userProfileDtoSchema>;
export type VerifyTokenDataDto = z.infer<typeof verifyTokenDataDtoSchema>;
export type VerifyTokenResponseDto = z.infer<
  typeof verifyTokenResponseDtoSchema
>;
