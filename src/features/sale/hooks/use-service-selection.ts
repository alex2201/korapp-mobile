import { router } from 'expo-router';

import type { Service } from '@/domain/models/service';
import { useSaleStore } from '@/stores/sale-store';
import { useServiceStore } from '@/stores/service-store';

export function useServiceSelection() {
  const services = useServiceStore((state) => state.services);
  const addService = useSaleStore((state) => state.addService);

  function selectService(service: Service) {
    addService(service);
    router.back();
  }

  return { selectService, services };
}
