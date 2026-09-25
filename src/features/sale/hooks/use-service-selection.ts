import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import type { Service } from '@/domain/models/service';
import { schedulingRepository } from '@/services/farmacia-app-api/repositories/scheduling-repository';
import { useSaleStore } from '@/stores/sale-store';

export function useServiceSelection() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const addService = useSaleStore((state) => state.addService);

  useEffect(() => {
    let isCurrent = true;

    async function loadServices() {
      setIsLoading(true);
      setError(null);

      try {
        const nextServices = await schedulingRepository.listServices();
        if (isCurrent) setServices(nextServices);
      } catch (loadError) {
        if (!isCurrent) return;
        setServices([]);
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'No fue posible cargar los servicios.',
        );
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    void loadServices();
    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  function selectService(service: Service) {
    addService(service);
    router.back();
  }

  return { error, isLoading, retry, selectService, services };
}
