import { ScrollView } from 'react-native';

import { AppText } from '@/components/ui';
import { colors, spacing } from '@/theme';

export default function SaleScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        padding: spacing['2xl'],
      }}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background.default }}
    >
      <AppText selectable tone="brand" variant="display">
        Punto de venta
      </AppText>
    </ScrollView>
  );
}
