import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui';

import { styles } from './dashboard-screen.styles';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <AppText style={styles.title} tone="brand" variant="display">
          Dashboard
        </AppText>
      </View>
    </SafeAreaView>
  );
}
