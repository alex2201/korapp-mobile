import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import {
  verifyTokenResponseSchema,
  type VerifyTokenData,
} from './auth-types';

export async function verifyFirebaseToken(): Promise<VerifyTokenData> {
  const response = await korappHttpClient.post(
    '/auth/verify-token',
    verifyTokenResponseSchema,
  );

  return response.data;
}
