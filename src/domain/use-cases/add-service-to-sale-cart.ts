import type { SaleCartItem } from '../models/sale-cart-item';
import type { Service } from '../models/service';
import { updateSaleCartItemQuantity } from './update-sale-cart-item-quantity';

export function addServiceToSaleCart(
  cartItems: SaleCartItem[],
  service: Service,
): SaleCartItem[] {
  const itemKey = `service-${service.id}`;
  const existingItem = cartItems.find(
    (item) => item.kind === 'service' && item.service.id === service.id,
  );

  if (!existingItem) {
    return [...cartItems, { kind: 'service', service, quantity: 1 }];
  }

  const cartItemsWithCurrentService = cartItems.map((item) =>
    item.kind === 'service' && item.service.id === service.id
      ? { ...item, service }
      : item,
  );

  return updateSaleCartItemQuantity(cartItemsWithCurrentService, {
    itemKey,
    quantity: existingItem.quantity + 1,
  });
}
