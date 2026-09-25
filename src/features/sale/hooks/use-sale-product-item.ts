import { useState } from 'react';
import { Alert } from 'react-native';

import type { Product } from '@/domain/models/product';
import {
  getMaximumProductQuantity,
  resolveProductQuantity,
  stepProductQuantity,
} from '@/domain/use-cases/update-sale-cart-item-quantity';
import {
  formatFractionalQuantity,
  isFractionalProductUnit,
} from '@/lib/product-units';

type UseSaleProductItemInput = {
  onRemove: () => void;
  onSetQuantity: (quantity: number) => void;
  product: Product;
  quantity: number;
};

export function useSaleProductItem({
  onRemove,
  onSetQuantity,
  product,
  quantity,
}: UseSaleProductItemInput) {
  const isFractional = isFractionalProductUnit(product.unit);
  const hasQuantityError = !Number.isFinite(quantity) || quantity <= 0;
  const maximumQuantity = getMaximumProductQuantity(
    product.currentStock,
    product.unit,
  );
  const [quantityInput, setQuantityInput] = useState(
    isFractional && quantity === 0 ? '' : String(quantity),
  );

  function confirmRemoval(onCancel?: () => void) {
    Alert.alert(
      'Eliminar producto',
      `¿Quieres eliminar ${product.name} del carrito?`,
      [
        { onPress: onCancel, style: 'cancel', text: 'Cancelar' },
        { onPress: onRemove, style: 'destructive', text: 'Eliminar' },
      ],
    );
  }

  function setResolvedQuantity(requestedQuantity: number) {
    const nextQuantity = resolveProductQuantity({
      currentStock: product.currentStock,
      quantity: requestedQuantity,
      unit: product.unit,
    });

    setQuantityInput(
      nextQuantity > 0 ? formatFractionalQuantity(nextQuantity) : '',
    );
    onSetQuantity(nextQuantity);
  }

  function changeFractionalInput(value: string) {
    const normalizedValue = value.replace(',', '.');
    if (!/^\d*(?:\.\d{0,3})?$/.test(normalizedValue)) return;

    if (normalizedValue === '' || normalizedValue === '.') {
      setQuantityInput(normalizedValue);
      onSetQuantity(0);
      return;
    }

    const parsedQuantity = Number(normalizedValue);
    if (!Number.isFinite(parsedQuantity)) return;

    if (parsedQuantity > maximumQuantity) {
      setResolvedQuantity(parsedQuantity);
      return;
    }

    setQuantityInput(normalizedValue);
    onSetQuantity(parsedQuantity);
  }

  function normalizeFractionalInput() {
    setQuantityInput(quantity > 0 ? formatFractionalQuantity(quantity) : '');
  }

  function stepFractionalQuantity(direction: -1 | 1) {
    const nextQuantity = stepProductQuantity(
      {
        currentStock: product.currentStock,
        quantity,
        unit: product.unit,
      },
      direction,
    );
    setQuantityInput(
      nextQuantity > 0 ? formatFractionalQuantity(nextQuantity) : '',
    );
    onSetQuantity(nextQuantity);
  }

  function decreaseDiscreteQuantity() {
    if (quantity === 1) {
      confirmRemoval();
      return;
    }

    onSetQuantity(
      stepProductQuantity(
        {
          currentStock: product.currentStock,
          quantity,
          unit: product.unit,
        },
        -1,
      ),
    );
  }

  function increaseDiscreteQuantity() {
    onSetQuantity(
      stepProductQuantity(
        {
          currentStock: product.currentStock,
          quantity,
          unit: product.unit,
        },
        1,
      ),
    );
  }

  return {
    changeFractionalInput,
    confirmRemoval,
    decreaseDiscreteQuantity,
    hasQuantityError,
    increaseDiscreteQuantity,
    isFractional,
    maximumQuantity,
    normalizeFractionalInput,
    quantityInput,
    stepFractionalQuantity,
  };
}
