import { Redirect } from 'expo-router';

import { useAuth } from '@/features/auth/auth-provider';
import { AppSplashScreen } from '@/features/splash/splash-screen';

export default function IndexRoute() {
  const { token } = useAuth();

  if (token === undefined) {
    return <AppSplashScreen />;
  }

  return <Redirect href={token ? '/dashboard' : '/login'} />;
}
