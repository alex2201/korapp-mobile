import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from 'expo-camera';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Pressable,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components/ui';
import type { ProductBarcodeSearchResult } from '@/domain/models/product';
import { searchProductByBarcode } from '@/domain/use-cases/search-product-by-barcode';
import { ApiError } from '@/infrastructure/http/api-error';
import { pharmacyRepository } from '@/services/farmacia-app-api/repositories/pharmacy-repository';
import { colors } from '@/theme';

import { styles } from './product-barcode-scanner.styles';

const SUPPORTED_BARCODE_TYPES = [
  'ean13',
  'ean8',
  'upc_a',
  'upc_e',
  'code128',
  'code39',
  'itf14',
] as const;

type ProductBarcodeScannerProps = {
  onClose: () => void;
  onProductFound: (product: ProductBarcodeSearchResult) => void;
  visible: boolean;
};

export function ProductBarcodeScanner({
  onClose,
  onProductFound,
  visible,
}: ProductBarcodeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const isProcessingRef = useRef(false);
  const requestIdRef = useRef(0);

  async function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    setIsProcessing(true);
    const requestId = ++requestIdRef.current;

    try {
      const product = await searchProductByBarcode(
        { pharmacyRepository },
        result.data,
      );

      if (requestId !== requestIdRef.current) return;
      onProductFound(product);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;

      const isNotFound = error instanceof ApiError && error.status === 404;

      Alert.alert(
        isNotFound ? 'Producto no encontrado' : 'No fue posible buscarlo',
        isNotFound
          ? `No encontramos un producto con el código ${result.data}.`
          : error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado. Intenta nuevamente.',
      );

      isProcessingRef.current = false;
      setIsProcessing(false);
    }
  }

  function handleClose() {
    requestIdRef.current += 1;
    isProcessingRef.current = false;
    setIsProcessing(false);
    onClose();
  }

  function handleShow() {
    requestIdRef.current += 1;
    isProcessingRef.current = false;
    setIsProcessing(false);
  }

  return (
    <Modal
      animationType="slide"
      onRequestClose={handleClose}
      onShow={handleShow}
      presentationStyle="fullScreen"
      visible={visible}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <AppText tone="inverse" variant="subheading">
              Escanear producto
            </AppText>
            <AppText style={styles.headerDescription} tone="inverse" variant="bodySmall">
              Centra el código y mantén el producto a unos 20 cm de la cámara.
            </AppText>
          </View>
          <Pressable
            accessibilityLabel="Cerrar escáner"
            accessibilityRole="button"
            hitSlop={12}
            onPress={handleClose}
            style={({ pressed }) => [
              styles.closeButton,
              pressed ? styles.closeButtonPressed : null,
            ]}
          >
            <AppText tone="inverse" variant="heading">
              ×
            </AppText>
          </Pressable>
        </View>

        <View style={styles.cameraContainer}>
          {!permission ? (
            <View style={styles.centeredContent}>
              <ActivityIndicator color={colors.text.inverse} size="large" />
              <AppText tone="inverse">Preparando la cámara…</AppText>
            </View>
          ) : permission.granted ? (
            <>
              <CameraView
                barcodeScannerSettings={{
                  barcodeTypes: [...SUPPORTED_BARCODE_TYPES],
                }}
                facing="back"
                onBarcodeScanned={
                  isProcessing ? undefined : handleBarcodeScanned
                }
                style={styles.camera}
                autofocus='on'
                zoom={0.2}
              />
              <View pointerEvents="none" style={styles.scanOverlay}>
                <View style={styles.scanFrame} />
              </View>
              {isProcessing ? (
                <View style={styles.processingOverlay}>
                  <ActivityIndicator color={colors.text.inverse} size="large" />
                  <AppText tone="inverse" variant="labelLarge">
                    Buscando producto…
                  </AppText>
                </View>
              ) : null}
            </>
          ) : (
            <View style={styles.permissionContent}>
              <AppText tone="inverse" variant="heading">
                Permiso de cámara
              </AppText>
              <AppText style={styles.permissionDescription} tone="inverse">
                Korapp necesita usar la cámara para leer el código de barras del
                producto.
              </AppText>
              {permission.canAskAgain ? (
                <Button onPress={() => void requestPermission()}>
                  Permitir cámara
                </Button>
              ) : (
                <Button onPress={() => void Linking.openSettings()}>
                  Abrir configuración
                </Button>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
