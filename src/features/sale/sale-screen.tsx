import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';

import { AppText } from '@/components/ui';
import type { ProductBarcodeSearchResult } from '@/domain/models/product';
import { getSaleCartItemKey } from '@/domain/models/sale-cart-item';
import { getSaleCartSummary } from '@/domain/use-cases/get-sale-cart-summary';
import { validateSaleCartForCheckout } from '@/domain/use-cases/validate-sale-cart-for-checkout';
import { formatMxnCurrency } from '@/lib/currency';
import { useSaleStore } from '@/stores/sale-store';
import { colors } from '@/theme';

import { AddServiceButton } from './components/add-service-button';
import { CheckoutAlertIcon } from './components/checkout-alert-icon';
import { ProductBarcodeScanner } from './components/product-barcode-scanner';
import { SaleProductItem } from './components/sale-product-item';
import { SaleServiceItem } from './components/sale-service-item';
import { ScanProductButton } from './components/scan-product-button';
import { SearchProductButton } from './components/search-product-button';
import { styles } from './sale-screen.styles';

export default function SaleScreen() {
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const addProduct = useSaleStore((state) => state.addProduct);
  const cartItems = useSaleStore((state) => state.cartItems);
  const removeItem = useSaleStore((state) => state.removeItem);
  const setItemQuantity = useSaleStore(
    (state) => state.setItemQuantity,
  );
  const cartSummary = useMemo(
    () => getSaleCartSummary(cartItems),
    [cartItems],
  );
  const cartValidation = useMemo(
    () => validateSaleCartForCheckout(cartItems),
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
                  {cartItems.map((item) => {
                    const itemKey = getSaleCartItemKey(item);

                    return item.kind === 'product' ? (
                      <SaleProductItem
                        key={itemKey}
                        onRemove={() => removeItem(itemKey)}
                        onSetQuantity={(quantity) =>
                          setItemQuantity(itemKey, quantity)
                        }
                        product={item.product}
                        quantity={item.quantity}
                      />
                    ) : (
                      <SaleServiceItem
                        key={itemKey}
                        onRemove={() => removeItem(itemKey)}
                        onSetQuantity={(quantity) =>
                          setItemQuantity(itemKey, quantity)
                        }
                        quantity={item.quantity}
                        service={item.service}
                      />
                    );
                  })}
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

        <View style={styles.checkoutSection}>
          {cartSummary.itemCount > 0 && !cartValidation.isValid ? (
            <View
              accessibilityLiveRegion="polite"
              accessibilityRole="alert"
              style={styles.checkoutAlert}
            >
              <CheckoutAlertIcon
                color={colors.statusSurface.warning.text}
                size={16}
              />
              <AppText style={styles.checkoutAlertText} variant="caption">
                {cartValidation.reason}
              </AppText>
            </View>
          ) : null}
          <View style={styles.checkoutSummary}>
            <View
              style={[
                styles.productCountBadge,
                cartSummary.itemCount === 0
                  ? styles.productCountBadgeEmpty
                  : null,
              ]}
            >
              <AppText
                tone={cartSummary.itemCount === 0 ? 'muted' : 'brand'}
                variant="labelLarge"
              >
                {`${cartSummary.itemCount} ${cartSummary.itemCount === 1 ? 'artículo' : 'artículos'
                  }`}
              </AppText>
            </View>
            <View style={styles.checkoutAction}>
              <Pressable
                accessibilityLabel={
                  cartValidation.isValid
                    ? `Cobrar ${formatMxnCurrency(cartSummary.total)}`
                    : `Cobro no disponible. ${cartValidation.reason ?? ''}`
                }
                accessibilityRole="button"
                accessibilityState={{ disabled: !cartValidation.isValid }}
                disabled={!cartValidation.isValid}
                onPress={handleCheckout}
                style={({ pressed }) => [
                  styles.checkoutButton,
                  pressed ? styles.checkoutButtonPressed : null,
                  !cartValidation.isValid
                    ? styles.checkoutButtonDisabled
                    : null,
                ]}
              >
                <AppText tone="inverse" variant="labelLarge">
                  {`Cobrar · ${formatMxnCurrency(cartSummary.total)}`}
                </AppText>
              </Pressable>
            </View>
          </View>
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
