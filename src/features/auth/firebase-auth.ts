import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from '@react-native-firebase/auth';

type AuthStateListener = (user: User | null) => void;
type AuthErrorListener = (error: Error) => void;

export function observeFirebaseAuthState(
  listener: AuthStateListener,
  onError?: AuthErrorListener,
) {
  return onAuthStateChanged(getAuth(), listener, onError);
}

export function getFirebaseAuthToken(
  user: User | null = getAuth().currentUser,
  forceRefresh = false,
) {
  return user?.getIdToken(forceRefresh) ?? Promise.resolve(null);
}

export function signOutFromFirebase() {
  return signOut(getAuth());
}

export function signInToFirebaseWithEmailAndPassword(email: string, password: string) {
  return signInWithEmailAndPassword(getAuth(), email, password);
}

export function resetPasswordWithEmail(email: string) {
  return sendPasswordResetEmail(getAuth(), email);
}
