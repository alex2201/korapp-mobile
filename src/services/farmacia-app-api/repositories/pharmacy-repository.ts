import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import { pharmacyResponseDtoSchema } from '../dtos/pharmacy-dtos';
import { mapPharmacyDto } from '../mappers/pharmacy-mappers';

export const pharmacyRepository = {
  async getInfo() {
    const response = await korappHttpClient.get(
      '/pharmacy/info',
      pharmacyResponseDtoSchema,
    );

    return mapPharmacyDto(response.data);
  },
};
