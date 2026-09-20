import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';

import { signOutFromFirebase } from '../auth/firebase-auth';
import { useAuthenticatedUser } from '../auth/use-authenticated-user';
import { styles } from './dashboard-screen.styles';

export default function DashboardScreen() {
  const user = useAuthenticatedUser();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <AppText style={styles.title} tone="brand" variant="display">
          Dashboard
        </AppText>
        <AppText style={styles.title} tone="brand" variant="display">
          Buenos días, {user.displayName ?? 'Usuario'}
        </AppText>
        <Button
          fullWidth
          onPress={signOutFromFirebase}
          size="lg"
        >
          Cerrar sesión
        </Button>
      </View>
    </SafeAreaView>
  );
}
