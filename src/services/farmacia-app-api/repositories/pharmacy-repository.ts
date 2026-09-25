import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import {
  pharmacyResponseDtoSchema,
  productBarcodeSuggestionsResponseDtoSchema,
  productBarcodeSearchResponseDtoSchema,
  productSearchResponseDtoSchema,
} from '../dtos/pharmacy-dtos';
import {
  mapPharmacyDto,
  mapProductBarcodeSuggestionDto,
  mapProductBarcodeSearchResultDto,
  mapProductSearchResponseDto,
} from '../mappers/pharmacy-mappers';

export const pharmacyRepository = {
  async getInfo() {
    const response = await korappHttpClient.get(
      '/pharmacy/info',
      pharmacyResponseDtoSchema,
    );

    return mapPharmacyDto(response.data);
  },

  async searchProducts(search: string) {
    const response = await korappHttpClient.get(
      '/pharmacy/products',
      productSearchResponseDtoSchema,
      { query: { search } },
    );

    return mapProductSearchResponseDto(response);
  },

  async suggestProductsByBarcode(prefix: string, limit: number) {
    const response = await korappHttpClient.get(
      '/pharmacy/products/barcode/suggestions',
      productBarcodeSuggestionsResponseDtoSchema,
      { query: { prefix, limit } },
    );

    return response.data.map(mapProductBarcodeSuggestionDto);
  },

  async searchProductByBarcode(barcode: string) {
    const response = await korappHttpClient.get(
      '/pharmacy/products/barcode',
      productBarcodeSearchResponseDtoSchema,
      { query: { barcode } },
    );

    return mapProductBarcodeSearchResultDto(response.data);
  },
};
