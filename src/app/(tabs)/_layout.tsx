import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { colors } from '@/theme';

export default function TabsLayout() {
  return (
    <NativeTabs tintColor={colors.brand.primary}>
      <NativeTabs.Trigger name="sale">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'cart', selected: 'cart.fill' }}
          md={{ default: 'shopping_cart', selected: 'shopping_cart' }}
        />
        <NativeTabs.Trigger.Label>Venta</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="clinical">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'stethoscope', selected: 'stethoscope' }}
          md={{ default: 'stethoscope', selected: 'stethoscope' }}
        />
        <NativeTabs.Trigger.Label>Clínica</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="more" role="more">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'ellipsis.circle', selected: 'ellipsis.circle.fill' }}
          md={{ default: 'more_horiz', selected: 'more_horiz' }}
        />
        <NativeTabs.Trigger.Label>Más</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
