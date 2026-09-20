import type { User } from '@react-native-firebase/auth';
import { create } from 'zustand';

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
      status: 'ready';
      user: User | null;
    };

type AuthState = {
  initializeAuth: () => () => void;
  logout: () => Promise<void>;
  session: AuthSession;
};

let observationGeneration = 0;

export const useAuthStore = create<AuthState>((set) => ({
  session: { status: 'initializing', user: null },

  initializeAuth: () => {
    const generation = ++observationGeneration;

    set({ session: { status: 'initializing', user: null } });

    const unsubscribe = observeFirebaseAuthState(
      (firebaseUser) => {
        if (generation === observationGeneration) {
          set({ session: { status: 'ready', user: firebaseUser } });
          console.log('Firebase Auth initialized', firebaseUser);
        }
      },
      (error) => {
        // TODO: Report Firebase Auth initialization errors to the app logging service.
        console.error('Firebase Auth initialization failed', error);

        if (generation === observationGeneration) {
          set({ session: { status: 'ready', user: null } });
        }
      },
    );

    return () => {
      if (generation === observationGeneration) {
        observationGeneration += 1;
      }

      unsubscribe();
    };
  },

  logout: async () => {
    await signOutFromFirebase();
    set({ session: { status: 'ready', user: null } });
  },
}));

export const useAuth = useAuthStore;
