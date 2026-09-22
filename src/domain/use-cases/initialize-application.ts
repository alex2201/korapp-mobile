import type { AuthenticatedUser } from '../models/authenticated-user';
import type { Pharmacy } from '../models/pharmacy';
import type {
  AuthRepository,
  AuthSessionRepository,
  PharmacyRepository,
} from '../repositories/application-repositories';

type InitializeApplicationDependencies = {
  authRepository: AuthRepository;
  authSessionRepository: AuthSessionRepository;
  pharmacyRepository: PharmacyRepository;
};

type InitializeApplicationCallbacks = {
  onAuthenticated: (user: AuthenticatedUser, pharmacy: Pharmacy) => void;
  onError: (error: unknown) => void;
  onInitializing: () => void;
  onUnauthenticated: () => void;
};

export function initializeApplication(
  {
    authRepository,
    authSessionRepository,
    pharmacyRepository,
  }: InitializeApplicationDependencies,
  {
    onAuthenticated,
    onError,
    onInitializing,
    onUnauthenticated,
  }: InitializeApplicationCallbacks,
) {
  let authStateChange = 0;
  let isActive = true;

  onInitializing();

  const unsubscribe = authSessionRepository.observeAuthState(
    async (identity) => {
      const change = ++authStateChange;
      const isCurrent = () => isActive && change === authStateChange;

      if (!identity) {
        if (isCurrent()) onUnauthenticated();
        return;
      }

      try {
        const token = await authSessionRepository.getToken(identity);

        if (!token) {
          if (isCurrent()) onUnauthenticated();
          return;
        }

        const user = await authRepository.verifyToken();
        const pharmacy = await pharmacyRepository.getInfo();

        if (isCurrent()) onAuthenticated(user, pharmacy);
      } catch (error) {
        if (isCurrent()) onError(error);
      }
    },
    (error) => {
      authStateChange += 1;
      if (isActive) onError(error);
    },
  );

  return () => {
    isActive = false;
    authStateChange += 1;
    unsubscribe();
  };
}
