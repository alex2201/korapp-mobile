import { create } from 'zustand';

import type { AuthenticatedUser } from '@/domain/models/authenticated-user';
import { firebaseAuthRepository } from '@/services/firebase-auth/repositories/firebase-auth-repository';

export type AuthSession =
  | {
      status: 'initializing';
      user: null;
    }
  | {
      status: 'unauthenticated';
      user: null;
    }
  | {
      status: 'authenticated';
      user: AuthenticatedUser;
    };

type AuthState = {
  logout: () => Promise<void>;
  session: AuthSession;
  setAuthenticated: (user: AuthenticatedUser) => void;
  setInitializing: () => void;
  setUnauthenticated: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: { status: 'initializing', user: null },

  logout: async () => {
    await firebaseAuthRepository.signOut();
    set({ session: { status: 'unauthenticated', user: null } });
  },

  setAuthenticated: (user) =>
    set({ session: { status: 'authenticated', user } }),
  setInitializing: () =>
    set({ session: { status: 'initializing', user: null } }),
  setUnauthenticated: () =>
    set({ session: { status: 'unauthenticated', user: null } }),
}));
