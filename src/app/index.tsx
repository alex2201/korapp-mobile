import { Redirect } from 'expo-router';

import { useAuthStore } from '@/stores/auth-store';
import { AppSplashScreen } from '@/features/splash/splash-screen';

export default function IndexRoute() {
  const session = useAuthStore((state) => state.session);

  if (session.status === 'initializing') {
    return <AppSplashScreen />;
  }

  return <Redirect href={session.user ? '/sale' : '/login'} />;
}
