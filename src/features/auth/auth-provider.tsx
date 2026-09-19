import {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { deleteAuthToken, getAuthToken, saveAuthToken } from './auth-storage';

type AuthContextValue = {
  clearToken: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  token: string | null | undefined;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setStoredToken] = useState<string | null>();

  useEffect(() => {
    async function loadToken() {
      try {
        setStoredToken(await getAuthToken());
      } catch {
        setStoredToken(null);
      }
    }

    void loadToken();
  }, []);

  const setToken = useCallback(async (nextToken: string) => {
    await saveAuthToken(nextToken);
    setStoredToken(nextToken);
  }, []);

  const clearToken = useCallback(async () => {
    await deleteAuthToken();
    setStoredToken(null);
  }, []);

  const value = useMemo(() => ({ clearToken, setToken, token }), [clearToken, setToken, token]);

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
