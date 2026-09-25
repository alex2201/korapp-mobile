import type { Service } from '@/domain/models/service';

import type { ServiceDto } from '../dtos/scheduling-dtos';

export function mapServiceDto(dto: ServiceDto): Service | null {
  if (!dto.isActive || dto.price === null) return null;

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    durationMin: dto.durationMin,
    price: dto.price,
    colorHex: dto.colorHex,
  };
}
