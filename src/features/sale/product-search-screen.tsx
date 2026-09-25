import { Stack } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  View,
} from 'react-native';

import { AppText, Card, TextField } from '@/components/ui';
import { formatMxnCurrency } from '@/lib/currency';
import { colors } from '@/theme';

import { BarcodeIcon } from './components/barcode-icon';
import { SearchIcon } from './components/search-icon';
import {
  type ProductSearchListItem,
  useProductSearch,
} from './hooks/use-product-search';
import { styles } from './product-search-screen.styles';

export default function ProductSearchScreen() {
  const {
    closeSearch,
    hasSearched,
    inputRef,
    isSearching,
    mode,
    query,
    results,
    searchError,
    selectMode,
    selectResult,
    setQuery,
  } = useProductSearch();

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screen}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              accessibilityLabel="Cerrar búsqueda"
              accessibilityRole="button"
              hitSlop={4}
              onPress={closeSearch}
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
        data={results}
        ItemSeparatorComponent={() => <View style={styles.resultSeparator} />}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(result) =>
          result.kind === 'product'
            ? result.product.publicId
            : result.suggestion.publicId
        }
        ListEmptyComponent={
          <ProductSearchEmptyState
            error={searchError}
            hasSearched={hasSearched}
            isSearching={isSearching}
            mode={mode}
            query={query}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.introduction}>
              <AppText variant="heading">Encuentra un producto</AppText>
              <AppText tone="secondary">
                Busca con el código impreso en el empaque o cambia al modo por
                nombre.
              </AppText>
            </View>

            <View
              accessibilityRole="tablist"
              accessibilityLabel="Tipo de búsqueda"
              style={styles.modeSelector}
            >
              <ModeButton
                active={mode === 'barcode'}
                icon={<BarcodeIcon color={mode === 'barcode' ? colors.brand.primary : colors.text.muted} size={18} />}
                label="Código de barras"
                onPress={() => selectMode('barcode')}
              />
              <ModeButton
                active={mode === 'name'}
                icon={<SearchIcon color={mode === 'name' ? colors.brand.primary : colors.text.muted} size={18} />}
                label="Nombre"
                onPress={() => selectMode('name')}
              />
            </View>

            <View style={styles.form}>
              <TextField
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                key={mode}
                keyboardType={mode === 'barcode' ? 'number-pad' : 'default'}
                label={mode === 'barcode' ? 'Código de barras' : 'Nombre del producto'}
                leading={
                  mode === 'barcode' ? (
                    <BarcodeIcon color={colors.text.muted} size={20} />
                  ) : (
                    <SearchIcon color={colors.text.muted} size={20} />
                  )
                }
                onChangeText={setQuery}
                placeholder={
                  mode === 'barcode'
                    ? 'Ej. 7501234567890'
                    : 'Nombre, principio activo o SKU'
                }
                ref={inputRef}
                returnKeyType="done"
                value={query}
              />
            </View>

            <AppText variant="subheading">Resultados</AppText>
          </View>
        }
        renderItem={({ item }) => (
          <ProductSearchResultItem
            onPress={() => void selectResult(item)}
            result={item}
          />
        )}
      />
    </KeyboardAvoidingView>
  );
}

type ProductSearchEmptyStateProps = {
  error: string | null;
  hasSearched: boolean;
  isSearching: boolean;
  mode: 'barcode' | 'name';
  query: string;
};

function ProductSearchEmptyState({
  error,
  hasSearched,
  isSearching,
  mode,
  query,
}: ProductSearchEmptyStateProps) {
  const title = error
    ? 'No fue posible buscar'
    : hasSearched
      ? 'Sin resultados'
      : query.trim()
        ? 'Buscando productos'
        : 'Busca un producto';

  return (
    <Card padding="lg" style={styles.emptyResults} variant="soft">
      {isSearching ? (
        <ActivityIndicator color={colors.brand.primary} size="large" />
      ) : (
        <SearchIcon color={colors.brand.secondary} size={32} />
      )}
      <AppText variant="labelLarge">{title}</AppText>
      <AppText
        selectable={Boolean(error)}
        style={styles.emptyResultsDescription}
        tone={error ? 'error' : 'muted'}
      >
        {error ??
          (mode === 'barcode'
            ? hasSearched
              ? `No encontramos códigos que comiencen con “${query.trim()}”.`
              : 'Escribe los primeros números del código. Las coincidencias aparecerán automáticamente.'
            : hasSearched
              ? `No encontramos productos para “${query.trim()}”.`
              : 'Escribe un nombre, principio activo o SKU. La búsqueda comenzará automáticamente.')}
      </AppText>
    </Card>
  );
}

type ProductSearchResultItemProps = {
  onPress: () => void;
  result: ProductSearchListItem;
};

function ProductSearchResultItem({
  onPress,
  result,
}: ProductSearchResultItemProps) {
  if (result.kind === 'barcode-suggestion') {
    const { suggestion } = result;

    return (
      <Pressable
        accessibilityLabel={`${suggestion.name}, código ${suggestion.barcode}`}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => pressed ? styles.resultPressed : null}
      >
        <Card padding="sm" variant="outlined">
          <View style={styles.resultContent}>
            <View style={styles.resultInformation}>
              <AppText numberOfLines={2} selectable variant="labelLarge">
                {suggestion.name}
              </AppText>
              <AppText numberOfLines={1} selectable tone="muted" variant="bodySmall">
                {suggestion.genericName || 'Sin principio activo'}
              </AppText>
            </View>
            <View style={styles.resultMetadata}>
              <AppText selectable tone="secondary" variant="label">
                {suggestion.barcode}
              </AppText>
              <AppText tone="muted" variant="caption">
                Código de barras
              </AppText>
            </View>
          </View>
        </Card>
      </Pressable>
    );
  }

  const { product } = result;
  const hasStock = product.currentStock > 0;
  const numericPrice = Number(product.currentPrice);
  const price = product.currentPrice !== null && Number.isFinite(numericPrice)
    ? formatMxnCurrency(numericPrice)
    : 'Sin precio';

  return (
    <Pressable
      accessibilityLabel={`${product.name}, ${price}, ${product.currentStock} disponibles`}
      accessibilityRole="button"
      accessibilityState={{ disabled: !hasStock }}
      disabled={!hasStock}
      onPress={onPress}
      style={({ pressed }) => [
        pressed ? styles.resultPressed : null,
        !hasStock ? styles.resultDisabled : null,
      ]}
    >
      <Card padding="sm" variant="outlined">
        <View style={styles.resultContent}>
          <View style={styles.resultInformation}>
            <AppText numberOfLines={2} selectable variant="labelLarge">
              {product.name}
            </AppText>
            <AppText numberOfLines={1} selectable tone="muted" variant="bodySmall">
              {product.genericName || 'Sin principio activo'}
            </AppText>
          </View>
          <View style={styles.resultMetadata}>
            <AppText selectable tone="secondary" variant="labelLarge">
              {price}
            </AppText>
            <AppText tone={hasStock ? 'muted' : 'error'} variant="caption">
              {hasStock ? `${product.currentStock} disponibles` : 'Sin existencias'}
            </AppText>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

type ModeButtonProps = {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

function ModeButton({ active, icon, label, onPress }: ModeButtonProps) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.modeButton,
        active ? styles.modeButtonActive : null,
        pressed ? styles.modeButtonPressed : null,
      ]}
    >
      {icon}
      <AppText tone={active ? 'brand' : 'muted'} variant="label">
        {label}
      </AppText>
    </Pressable>
  );
}
