import { Stack } from 'expo-router';

import { colors } from '@/theme';

export default function SaleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="product-search"
        options={{
          contentStyle: { backgroundColor: colors.background.default },
          headerBackButtonDisplayMode: 'minimal',
          headerShown: true,
          headerShadowVisible: false,
          presentation: 'fullScreenModal',
          title: 'Buscar producto',
        }}
      />
    </Stack>
  );
}
