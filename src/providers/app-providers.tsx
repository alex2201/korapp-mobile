import { PropsWithChildren, useEffect } from 'react';

import { initializeApplication } from '@/domain/use-cases/initialize-application';
import { authRepository } from '@/services/farmacia-app-api/repositories/auth-repository';
import { pharmacyRepository } from '@/services/farmacia-app-api/repositories/pharmacy-repository';
import { firebaseAuthRepository } from '@/services/firebase-auth/repositories/firebase-auth-repository';
import { useAuthStore } from '@/stores/auth-store';
import { usePharmacyStore } from '@/stores/pharmacy-store';

export function AppProviders({ children }: PropsWithChildren) {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setInitializing = useAuthStore((state) => state.setInitializing);
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const resetPharmacy = usePharmacyStore((state) => state.reset);
  const setPharmacyError = usePharmacyStore((state) => state.setError);
  const setPharmacyLoading = usePharmacyStore((state) => state.setLoading);
  const setPharmacy = usePharmacyStore((state) => state.setPharmacy);

  useEffect(
    () =>
      initializeApplication({
        authRepository,
        authSessionRepository: firebaseAuthRepository,
        pharmacyRepository,
      }, {
        onAuthenticated: (user, pharmacy) => {
          setPharmacy(pharmacy);
          setAuthenticated(user);
        },
        onError: (error) => {
          console.error('Application initialization failed', error);
          setPharmacyError(error);
          setUnauthenticated();
        },
        onInitializing: () => {
          setInitializing();
          setPharmacyLoading();
        },
        onUnauthenticated: () => {
          resetPharmacy();
          setUnauthenticated();
        },
      }),
    [
      resetPharmacy,
      setAuthenticated,
      setInitializing,
      setPharmacy,
      setPharmacyError,
      setPharmacyLoading,
      setUnauthenticated,
    ],
  );

  return children;
}
