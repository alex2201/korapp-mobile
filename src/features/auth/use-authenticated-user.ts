import { useAuthStore } from './auth-store';
import type { AuthenticatedUser } from './auth-types';

export function useAuthenticatedUser(): AuthenticatedUser {
  const session = useAuthStore((state) => state.session);

  if (session.status !== 'authenticated') {
    throw new Error(
      'useAuthenticatedUser must be used within an authenticated route',
    );
  }

  return session.user;
}
