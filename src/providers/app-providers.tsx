import { PropsWithChildren, useEffect } from 'react';

import { useAuthStore } from '@/features/auth/auth-store';

export function AppProviders({ children }: PropsWithChildren) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => initializeAuth(), [initializeAuth]);

  return children;
}
