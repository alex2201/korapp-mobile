import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';

import { AppText } from '@/components/ui';

import { AddServiceButton } from './components/add-service-button';
import { ScanProductButton } from './components/scan-product-button';
import { SearchProductButton } from './components/search-product-button';
import { styles } from './sale-screen.styles';

export default function SaleScreen() {
  return (
    <SafeAreaView edges={{ bottom: true }} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.content}>
          <AppText selectable tone="brand" variant="display">
            Punto de venta
          </AppText>
        </View>
      </ScrollView>

      <View style={styles.bottomAction}>
        <SearchProductButton />
        <AddServiceButton />
        <ScanProductButton />
      </View>
    </SafeAreaView>
  );
}
