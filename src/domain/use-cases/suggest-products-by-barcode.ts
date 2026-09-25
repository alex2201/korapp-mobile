import type { ProductBarcodeSuggestion } from '../models/product';
import type { PharmacyRepository } from '../repositories/application-repositories';

type SuggestProductsByBarcodeDependencies = {
  pharmacyRepository: PharmacyRepository;
};

const DEFAULT_SUGGESTION_LIMIT = 10;

export function suggestProductsByBarcode(
  { pharmacyRepository }: SuggestProductsByBarcodeDependencies,
  prefix: string,
): Promise<ProductBarcodeSuggestion[]> {
  const normalizedPrefix = prefix.trim();

  if (!normalizedPrefix) {
    throw new Error('El prefijo del código de barras es obligatorio');
  }

  if (!/^\d+$/.test(normalizedPrefix)) {
    throw new Error('El código de barras solo puede contener números');
  }

  return pharmacyRepository.suggestProductsByBarcode(
    normalizedPrefix,
    DEFAULT_SUGGESTION_LIMIT,
  );
}
