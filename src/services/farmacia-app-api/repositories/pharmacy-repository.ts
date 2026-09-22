import { korappHttpClient } from '@/infrastructure/http/korapp-http-client';

import {
  pharmacyResponseDtoSchema,
  productBarcodeSearchResponseDtoSchema,
} from '../dtos/pharmacy-dtos';
import {
  mapPharmacyDto,
  mapProductBarcodeSearchResultDto,
} from '../mappers/pharmacy-mappers';

export const pharmacyRepository = {
  async getInfo() {
    const response = await korappHttpClient.get(
      '/pharmacy/info',
      pharmacyResponseDtoSchema,
    );

    return mapPharmacyDto(response.data);
  },

  async searchProductByBarcode(barcode: string) {
    const query = new URLSearchParams({ barcode });
    const response = await korappHttpClient.get(
      `/pharmacy/products/barcode?${query.toString()}`,
      productBarcodeSearchResponseDtoSchema,
    );

    return mapProductBarcodeSearchResultDto(response.data);
  },
};
