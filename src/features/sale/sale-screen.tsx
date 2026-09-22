import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';

import { AppText } from '@/components/ui';
import type { ProductBarcodeSearchResult } from '@/domain/models/product';
import { getSaleCartSummary } from '@/domain/use-cases/get-sale-cart-summary';
import { formatMxnCurrency } from '@/lib/currency';
import { useSaleStore } from '@/stores/sale-store';

import { AddServiceButton } from './components/add-service-button';
import { ProductBarcodeScanner } from './components/product-barcode-scanner';
import { SaleProductItem } from './components/sale-product-item';
import { ScanProductButton } from './components/scan-product-button';
import { SearchProductButton } from './components/search-product-button';
import { styles } from './sale-screen.styles';

export default function SaleScreen() {
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const addProduct = useSaleStore((state) => state.addProduct);
  const cartItems = useSaleStore((state) => state.cartItems);
  const removeProduct = useSaleStore((state) => state.removeProduct);
  const setProductQuantity = useSaleStore(
    (state) => state.setProductQuantity,
  );
  const cartSummary = useMemo(
    () => getSaleCartSummary(cartItems),
    [cartItems],
  );

  function handleProductFound(product: ProductBarcodeSearchResult) {
    setIsScannerVisible(false);
    addProduct(product);
  }

  function handleCheckout() {
    Alert.alert(
      'Cobrar venta',
      'El flujo para seleccionar el método de pago se implementará próximamente.',
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={{ bottom: true, top: true }}>
        <View style={styles.mainContent}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.content}>
              {cartItems.length > 0 ? (
                <View style={styles.productList}>
                  {cartItems.map((item) => (
                    <SaleProductItem
                      key={item.product.publicId}
                      onRemove={() =>
                        removeProduct(item.product.publicId)
                      }
                      onSetQuantity={(quantity) =>
                        setProductQuantity(item.product.publicId, quantity)
                      }
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <AppText tone="secondary" variant="subheading">
                    Aún no hay productos
                  </AppText>
                  <AppText style={styles.emptyStateDescription} tone="muted">
                    Escanea un código de barras para agregar el primer producto
                    a la venta.
                  </AppText>
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.checkoutSummary}>
          <View
            style={[
              styles.productCountBadge,
              cartSummary.productCount === 0
                ? styles.productCountBadgeEmpty
                : null,
            ]}
          >
            <AppText
              tone={cartSummary.productCount === 0 ? 'muted' : 'brand'}
              variant="labelLarge"
            >
              {`${cartSummary.productCount} ${
                cartSummary.productCount === 1 ? 'artículo' : 'artículos'
              }`}
            </AppText>
          </View>
          <Pressable
            accessibilityLabel={`Cobrar ${formatMxnCurrency(cartSummary.total)}`}
            accessibilityRole="button"
            accessibilityState={{ disabled: cartSummary.productCount === 0 }}
            disabled={cartSummary.productCount === 0}
            onPress={handleCheckout}
            style={({ pressed }) => [
              styles.checkoutButton,
              pressed ? styles.checkoutButtonPressed : null,
              cartSummary.productCount === 0
                ? styles.checkoutButtonDisabled
                : null,
            ]}
          >
            <AppText tone="inverse" variant="labelLarge">
              {`Cobrar · ${formatMxnCurrency(cartSummary.total)}`}
            </AppText>
          </Pressable>
        </View>

        <View style={styles.bottomAction}>
          <SearchProductButton />
          <AddServiceButton />
          <ScanProductButton onPress={() => setIsScannerVisible(true)} />
        </View>
        <ProductBarcodeScanner
          onClose={() => setIsScannerVisible(false)}
          onProductFound={handleProductFound}
          visible={isScannerVisible}
        />
      </SafeAreaView>
    </View>
  );
}
