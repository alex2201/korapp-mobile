import { create } from 'zustand';

import type { Service } from '@/domain/models/service';

type ServiceStore = {
  reset: () => void;
  services: Service[];
  setServices: (services: Service[]) => void;
};

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],

  reset: () => set({ services: [] }),
  setServices: (services) => set({ services }),
}));
