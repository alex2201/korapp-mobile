import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { styles } from './splash-screen.styles';

export function AppSplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Korapp</Text>
    </View>
  );
}
