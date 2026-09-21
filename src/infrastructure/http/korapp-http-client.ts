import { getFirebaseAuthToken } from '@/features/auth/firebase-auth';

import { HttpClient } from './http-client';

const apiUrl = process.env.EXPO_PUBLIC_KORAPP_API_URL;

if (!apiUrl) {
  throw new Error(
    'EXPO_PUBLIC_KORAPP_API_URL is not configured',
  );
}

export const korappHttpClient = new HttpClient(
  apiUrl,
  getFirebaseAuthToken,
);
