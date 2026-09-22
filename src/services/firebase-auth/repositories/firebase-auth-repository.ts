import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';

import type {
  AuthIdentity,
  AuthSessionRepository,
} from '@/domain/repositories/application-repositories';

type AuthStateListener = (user: AuthIdentity | null) => void;
type AuthErrorListener = (error: Error) => void;

export const firebaseAuthRepository: AuthSessionRepository & {
  resetPasswordWithEmail(email: string): Promise<void>;
  signInWithEmailAndPassword(email: string, password: string): Promise<unknown>;
  signOut(): Promise<void>;
} = {
  observeAuthState(
    listener: AuthStateListener,
    onError?: AuthErrorListener,
  ) {
    return onAuthStateChanged(getAuth(), listener, onError);
  },

  getToken(
    user: AuthIdentity | null = getAuth().currentUser,
    forceRefresh = false,
  ) {
    return user?.getIdToken(forceRefresh) ?? Promise.resolve(null);
  },

  signOut() {
    return signOut(getAuth());
  },

  signInWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(getAuth(), email, password);
  },

  resetPasswordWithEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  },
};
