import { firebaseAuthRepository } from '@/services/firebase-auth/repositories/firebase-auth-repository';

import { HttpClient } from './http-client';

const apiUrl = process.env.EXPO_PUBLIC_KORAPP_API_URL;

if (!apiUrl) {
  throw new Error(
    'EXPO_PUBLIC_KORAPP_API_URL is not configured',
  );
}

export const korappHttpClient = new HttpClient(
  apiUrl,
  () => firebaseAuthRepository.getToken(),
);
