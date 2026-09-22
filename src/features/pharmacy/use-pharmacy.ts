import type { Pharmacy } from '@/domain/models/pharmacy';
import { usePharmacyStore } from '@/stores/pharmacy-store';

export function usePharmacy(): Pharmacy {
  const pharmacyState = usePharmacyStore((state) => state);

  if (pharmacyState.status !== 'ready') {
    throw new Error(
      'usePharmacy must be used after the pharmacy has been initialized',
    );
  }

  return pharmacyState.pharmacy;
}
