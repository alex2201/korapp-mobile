import type { User } from '@react-native-firebase/auth';
import { create } from 'zustand';

import { verifyFirebaseToken } from './auth-api';
import { mapVerifyTokenDtoToAuthenticatedUser } from './auth-mappers';
import type { AuthenticatedUser } from './auth-types';
import {
  observeFirebaseAuthState,
  signOutFromFirebase,
} from './firebase-auth';

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
  initializeAuth: () => () => void;
  logout: () => Promise<void>;
  session: AuthSession;
};

let observationGeneration = 0;

type SetSession = (session: AuthSession) => void;

async function resolveFirebaseUser(
  firebaseUser: User | null,
  isCurrent: () => boolean,
  setSession: SetSession,
) {
  if (!firebaseUser) {
    if (isCurrent()) {
      setSession({ status: 'unauthenticated', user: null });
    }
    return;
  }

  try {
    const data = await verifyFirebaseToken();
    const user = mapVerifyTokenDtoToAuthenticatedUser(data);

    if (isCurrent()) {
      setSession({ status: 'authenticated', user });
    }
  } catch (error) {
    console.error('Account verification failed', error);

    if (isCurrent()) {
      setSession({ status: 'unauthenticated', user: null });
    }
  }
}

function startAuthObservation(setSession: SetSession) {
  const observation = ++observationGeneration;
  let authStateChange = 0;

  setSession({ status: 'initializing', user: null });

  const unsubscribe = observeFirebaseAuthState(
    (firebaseUser) => {
      const change = ++authStateChange;
      const isCurrent = () =>
        observation === observationGeneration && change === authStateChange;

      void resolveFirebaseUser(firebaseUser, isCurrent, setSession);
    },
    (error) => {
      authStateChange += 1;
      console.error('Firebase Auth initialization failed', error);

      if (observation === observationGeneration) {
        setSession({ status: 'unauthenticated', user: null });
      }
    },
  );

  return () => {
    if (observation === observationGeneration) {
      observationGeneration += 1;
    }

    unsubscribe();
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  session: { status: 'initializing', user: null },

  initializeAuth: () =>
    startAuthObservation((session) => set({ session })),

  logout: async () => {
    await signOutFromFirebase();
    set({ session: { status: 'unauthenticated', user: null } });
  },
}));
