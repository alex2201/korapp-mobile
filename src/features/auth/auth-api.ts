import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import {
  verifyTokenResponseDtoSchema,
  type VerifyTokenDataDto,
} from './auth-dtos';

export async function verifyFirebaseToken(): Promise<VerifyTokenDataDto> {
  const response = await korappHttpClient.post(
    '/auth/verify-token',
    verifyTokenResponseDtoSchema,
  );

  return response.data;
}
