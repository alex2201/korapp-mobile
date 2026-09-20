import { ScrollView } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { colors, spacing } from '@/theme';
import { signOutFromFirebase } from '../auth/firebase-auth';

export default function MoreScreen() {
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
        Más
      </AppText>
      <Button onPress={signOutFromFirebase}>
        Cerrar sesión
      </Button>
    </ScrollView>
  );
}
