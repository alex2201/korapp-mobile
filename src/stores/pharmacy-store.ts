import { create } from 'zustand';

import type { Pharmacy } from '@/domain/models/pharmacy';

export type PharmacyState =
  | { error: null; pharmacy: null; status: 'idle' }
  | { error: null; pharmacy: null; status: 'loading' }
  | { error: null; pharmacy: Pharmacy; status: 'ready' }
  | { error: unknown; pharmacy: null; status: 'error' };

type PharmacyActions = {
  reset: () => void;
  setError: (error: unknown) => void;
  setLoading: () => void;
  setPharmacy: (pharmacy: Pharmacy) => void;
};

type PharmacyStore = PharmacyState & PharmacyActions;

export const usePharmacyStore = create<PharmacyStore>((set) => ({
  error: null,
  pharmacy: null,
  status: 'idle',

  reset: () => set({ error: null, pharmacy: null, status: 'idle' }),
  setError: (error) => set({ error, pharmacy: null, status: 'error' }),
  setLoading: () => set({ error: null, pharmacy: null, status: 'loading' }),
  setPharmacy: (pharmacy) =>
    set({ error: null, pharmacy, status: 'ready' }),
}));
