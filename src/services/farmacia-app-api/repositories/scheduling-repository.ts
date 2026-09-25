import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';
import type { SchedulingRepository } from '@/domain/repositories/application-repositories';

import { servicesResponseDtoSchema } from '../dtos/scheduling-dtos';
import { mapServiceDto } from '../mappers/scheduling-mappers';

export const schedulingRepository: SchedulingRepository = {
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
