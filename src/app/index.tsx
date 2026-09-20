import { Redirect } from 'expo-router';

import { useAuth } from '@/features/auth/auth-store';
import { AppSplashScreen } from '@/features/splash/splash-screen';

export default function IndexRoute() {
  const session = useAuth((state) => state.session);

  if (session.status === 'initializing') {
    return <AppSplashScreen />;
  }

  return <Redirect href={session.user ? '/dashboard' : '/login'} />;
}
