import { useAuthStore } from './auth-store';
import type { Account } from './auth-types';

export function useAuthenticatedUser(): Account {
  const session = useAuthStore((state) => state.session);

  if (session.status !== 'authenticated') {
    throw new Error(
      'useAuthenticatedUser must be used within an authenticated route',
    );
  }

  return session.user;
}
