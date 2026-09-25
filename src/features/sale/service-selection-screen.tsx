import { Stack, router } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';

import { AppText, Card } from '@/components/ui';
import type { Service } from '@/domain/models/service';
import { formatMxnCurrency } from '@/lib/currency';
import { colors } from '@/theme';

import { ServiceIcon } from './components/service-icon';
import { useServiceSelection } from './hooks/use-service-selection';
import { styles } from './service-selection-screen.styles';

export default function ServiceSelectionScreen() {
  const { error, isLoading, retry, selectService, services } =
    useServiceSelection();

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              accessibilityLabel="Cerrar selección de servicios"
              accessibilityRole="button"
              hitSlop={4}
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.closeButton,
                pressed ? styles.closeButtonPressed : null,
              ]}
            >
              <AppText style={styles.closeButtonLabel} variant="heading">
                ×
              </AppText>
            </Pressable>
          ),
        }}
      />
      <FlatList
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        data={services}
        keyExtractor={(service) => String(service.id)}
        ListEmptyComponent={
          <ServiceEmptyState
            error={error}
            isLoading={isLoading}
            onRetry={retry}
          />
        }
        ListHeaderComponent={
          <View style={styles.introduction}>
            <AppText variant="heading">Selecciona un servicio</AppText>
            <AppText tone="secondary">
              Toca un servicio para agregarlo al carrito.
            </AppText>
          </View>
        }
        renderItem={({ item }) => (
          <ServiceListItem
            onPress={() => selectService(item)}
            service={item}
          />
        )}
      />
    </View>
  );
}

function ServiceListItem({
  onPress,
  service,
}: {
  onPress: () => void;
  service: Service;
}) {
  return (
    <Pressable
      accessibilityHint="Agrega el servicio al carrito"
      accessibilityLabel={`${service.name}, ${formatMxnCurrency(Number(service.price))}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.servicePressed : null)}
    >
      <Card padding="sm" variant="outlined">
        <View style={styles.serviceContent}>
          <View style={styles.serviceIcon}>
            <ServiceIcon color={service.colorHex ?? colors.brand.primary} size={22} />
          </View>
          <View style={styles.serviceInformation}>
            <AppText numberOfLines={2} selectable variant="labelLarge">
              {service.name}
            </AppText>
            <AppText numberOfLines={2} selectable tone="muted" variant="bodySmall">
              {service.description || `${service.durationMin} min`}
            </AppText>
          </View>
          <View style={styles.serviceMetadata}>
            <AppText selectable tone="secondary" variant="labelLarge">
              {formatMxnCurrency(Number(service.price))}
            </AppText>
            <AppText tone="muted" variant="caption">
              {service.durationMin} min
            </AppText>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

function ServiceEmptyState({
  error,
  isLoading,
  onRetry,
}: {
  error: string | null;
  isLoading: boolean;
  onRetry: () => void;
}) {
  return (
    <Card padding="lg" style={styles.emptyState} variant="soft">
      {isLoading ? (
        <ActivityIndicator color={colors.brand.primary} size="large" />
      ) : (
        <ServiceIcon color={colors.brand.secondary} size={36} />
      )}
      <AppText variant="labelLarge">
        {isLoading
          ? 'Cargando servicios'
          : error
            ? 'No fue posible cargar los servicios'
            : 'Sin servicios disponibles'}
      </AppText>
      <AppText
        selectable={Boolean(error)}
        style={styles.emptyDescription}
        tone={error ? 'error' : 'muted'}
      >
        {error ??
          (isLoading
            ? 'Espera un momento.'
            : 'No hay servicios activos con precio configurado.')}
      </AppText>
      {error ? (
        <Pressable
          accessibilityLabel="Reintentar carga de servicios"
          accessibilityRole="button"
          onPress={onRetry}
          style={({ pressed }) => [
            styles.retryButton,
            pressed ? styles.retryButtonPressed : null,
          ]}
        >
          <AppText tone="inverse" variant="label">
            Reintentar
          </AppText>
        </Pressable>
      ) : null}
    </Card>
  );
}
