import type { ProductSearchResult } from '../models/product';
import type { PharmacyRepository } from '../repositories/application-repositories';

type SearchProductsByNameDependencies = {
  pharmacyRepository: PharmacyRepository;
};

export function searchProductsByName(
  { pharmacyRepository }: SearchProductsByNameDependencies,
  name: string,
): Promise<ProductSearchResult> {
  const normalizedName = name.trim();

  if (!normalizedName) {
    throw new Error('El nombre del producto es obligatorio');
  }

  return pharmacyRepository.searchProducts(normalizedName);
}
