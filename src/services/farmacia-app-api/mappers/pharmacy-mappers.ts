import { Pharmacy } from '@/domain/models/pharmacy';
import type {
  Product,
  ProductBarcodeSuggestion,
  ProductBarcodeSearchResult,
} from '@/domain/models/product';

import type {
  PharmacyDto,
  ProductBarcodeSuggestionDto,
  ProductBarcodeSearchResultDto,
  ProductDto,
  ProductSearchResponseDto,
} from '../dtos/pharmacy-dtos';

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

export function mapProductDto(dto: ProductDto): Product {
  return {
    id: dto.id,
    publicId: dto.publicId,
    name: dto.name,
    genericName: dto.genericName,
    unit: dto.unit,
    barcode: dto.barcode,
    currentPrice: dto.currentPrice,
    currentStock: dto.currentStock,
    requiresPrescription: dto.requiresPrescription,
  };
}

export function mapProductBarcodeSuggestionDto(
  dto: ProductBarcodeSuggestionDto,
): ProductBarcodeSuggestion {
  return {
    id: dto.id,
    publicId: dto.publicId,
    name: dto.name,
    genericName: dto.genericName,
    barcode: dto.barcode,
    unit: dto.unit,
  };
}

export function mapProductSearchResponseDto(
  dto: ProductSearchResponseDto,
) {
  return {
    products: dto.data.map(mapProductDto),
    pagination: dto.pagination,
  };
}

export function mapProductBarcodeSearchResultDto(
  dto: ProductBarcodeSearchResultDto,
): ProductBarcodeSearchResult {
  return {
    ...mapProductDto(dto),
    bestBatchId: dto.bestBatchId,
  };
}
