import type { User } from '@react-native-firebase/auth';

import { useAuthStore } from './auth-store';

export function useAuthenticatedUser(): User {
  const session = useAuthStore((state) => state.session);

  if (session.status !== 'ready' || !session.user) {
    throw new Error(
      'useAuthenticatedUser must be used within an authenticated route',
    );
  }

  return session.user;
}
