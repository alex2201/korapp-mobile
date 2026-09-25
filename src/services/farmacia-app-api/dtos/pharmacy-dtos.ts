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

export const productDtoSchema = z.object({
  id: z.number().int().positive(),
  publicId: z.string().min(1),
  name: z.string().min(1),
  genericName: z.string().nullable(),
  unit: z.string().min(1),
  barcode: z.string().nullable(),
  currentPrice: z.string().nullable(),
  currentStock: z.number(),
  requiresPrescription: z.boolean(),
});

export const productBarcodeSearchResultDtoSchema = productDtoSchema.extend({
  bestBatchId: z.number().int().positive().nullable(),
});

export const productBarcodeSuggestionDtoSchema = z.object({
  id: z.number().int().positive(),
  publicId: z.string().min(1),
  name: z.string().min(1),
  genericName: z.string().nullable(),
  barcode: z.string().min(1),
  unit: z.string().min(1),
});

export const productBarcodeSuggestionsResponseDtoSchema = z.object({
  success: z.boolean(),
  data: z.array(productBarcodeSuggestionDtoSchema),
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export const paginationDtoSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export const productSearchResponseDtoSchema = z.object({
  success: z.boolean(),
  data: z.array(productDtoSchema),
  pagination: paginationDtoSchema,
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export const productBarcodeSearchResponseDtoSchema = z.object({
  success: z.boolean(),
  data: productBarcodeSearchResultDtoSchema,
  message: z.string().optional(),
  timestamp: z.iso.datetime(),
});

export type PharmacyDto = z.infer<typeof pharmacyDtoSchema>;
export type ProductDto = z.infer<typeof productDtoSchema>;
export type ProductBarcodeSuggestionDto = z.infer<
  typeof productBarcodeSuggestionDtoSchema
>;
export type ProductSearchResponseDto = z.infer<
  typeof productSearchResponseDtoSchema
>;
export type ProductBarcodeSearchResultDto = z.infer<
  typeof productBarcodeSearchResultDtoSchema
>;
