import { Pharmacy } from '@/domain/models/pharmacy';

import type { PharmacyDto } from '../dtos/pharmacy-dtos';

function mapSettings(settings: unknown): Record<string, unknown> {
  if (!settings) return {};

  if (typeof settings === 'string') {
    try {
      const parsedSettings: unknown = JSON.parse(settings);
      return typeof parsedSettings === 'object' && parsedSettings !== null
        ? (parsedSettings as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return typeof settings === 'object'
    ? (settings as Record<string, unknown>)
    : {};
}

export function mapPharmacyDto(dto: PharmacyDto): Pharmacy {
  return new Pharmacy({
    ...dto,
    settings: mapSettings(dto.settings),
  });
}
