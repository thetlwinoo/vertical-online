export interface AddToCartProps {
  id: number;
  quantity: number;
}

export interface ReduceFromCartProps {
  id: number;
  quantity: number;
}

export interface ChangedAddToOrderProps {
  id: number;
  isAddToOrder: boolean;
}

export interface ChangedOrderAllProps {
  checked: boolean;
  packageId: number;
}

export interface ChangeDeliveryMethodProps {
  cartId: number;
  deliveryMethodId: number;
  supplierId: number;
}
