import type { ProductBarcodeSearchResult } from '../models/product';
import type { PharmacyRepository } from '../repositories/application-repositories';

type SearchProductByBarcodeDependencies = {
  pharmacyRepository: PharmacyRepository;
};

export function searchProductByBarcode(
  { pharmacyRepository }: SearchProductByBarcodeDependencies,
  barcode: string,
): Promise<ProductBarcodeSearchResult> {
  const normalizedBarcode = barcode.trim();

  if (!normalizedBarcode) {
    throw new Error('El código de barras es obligatorio');
  }

  return pharmacyRepository.searchProductByBarcode(normalizedBarcode);
}
