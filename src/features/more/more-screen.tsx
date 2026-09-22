import { ScrollView } from 'react-native';

import { AppText, Button } from '@/components/ui';
import { firebaseAuthRepository } from '@/services/firebase-auth/repositories/firebase-auth-repository';
import { colors, spacing } from '@/theme';

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
      <Button onPress={firebaseAuthRepository.signOut}>
        Cerrar sesión
      </Button>
    </ScrollView>
  );
}
