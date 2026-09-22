import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import {
  verifyTokenResponseDtoSchema,
} from '../dtos/auth-dtos';
import { mapVerifyTokenDtoToAuthenticatedUser } from '../mappers/auth-mappers';

export const authRepository = {
  async verifyToken() {
    const response = await korappHttpClient.post(
      '/auth/verify-token',
      verifyTokenResponseDtoSchema,
    );

    return mapVerifyTokenDtoToAuthenticatedUser(response.data);
  },
};
