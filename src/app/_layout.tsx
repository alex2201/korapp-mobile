import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from '@expo-google-fonts/lato';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_700Bold_Italic,
  PlayfairDisplay_900Black,
} from '@expo-google-fonts/playfair-display';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { useAuth } from '@/features/auth/auth-provider';
import { AppSplashScreen } from '@/features/splash/splash-screen';
import { AppProviders } from '@/providers/app-providers';
import { colors } from '@/theme';

void SplashScreen.preventAutoHideAsync();

const TEST_BOOT_DELAY_MS = 1_000;

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_700Bold_Italic,
    PlayfairDisplay_900Black,
  });

  return (
    <AppProviders>
      <AppContent fontsReady={fontsLoaded || Boolean(fontError)} />
    </AppProviders>
  );
}

type AppContentProps = {
  fontsReady: boolean;
};

function AppContent({ fontsReady }: AppContentProps) {
  const { token } = useAuth();
  const [isTestDelayComplete, setIsTestDelayComplete] = useState(false);
  const isAppReady = fontsReady && token !== undefined && isTestDelayComplete;

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTestDelayComplete(true);
    }, TEST_BOOT_DELAY_MS);

    return () => clearTimeout(timeout);
  }, []);

  if (!isAppReady) {
    return <AppSplashScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  );
}

function RootNavigator() {
  const { token } = useAuth();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background.default },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Protected guard={Boolean(token)}>
        <Stack.Screen name="dashboard/index" />
      </Stack.Protected>
      <Stack.Protected guard={token !== undefined && token === null}>
        <Stack.Screen name="login/index" />
      </Stack.Protected>
    </Stack>
  );
}
