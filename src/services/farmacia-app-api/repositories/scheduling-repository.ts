import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import { servicesResponseDtoSchema } from '../dtos/scheduling-dtos';
import { mapServiceDto } from '../mappers/scheduling-mappers';

export const schedulingRepository = {
  async listServices() {
    const response = await korappHttpClient.get(
      '/scheduling/services',
      servicesResponseDtoSchema,
    );

    return response.data.flatMap((dto) => {
      const service = mapServiceDto(dto);
      return service ? [service] : [];
    });
  },
};
