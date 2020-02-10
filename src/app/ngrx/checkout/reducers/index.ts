import { IProducts } from '@eps/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromAddress from 'app/ngrx/checkout/reducers/address.reducer';
import * as fromCart from 'app/ngrx/checkout/reducers/cart.reducer';
import * as fromOrder from 'app/ngrx/checkout/reducers/order.reducer';
import * as fromPayment from 'app/ngrx/checkout/reducers/payment.reducer';
import * as fromRoot from 'app/ngrx';

export const checkoutFeatureKey = 'checkout';

export interface CheckoutState {
    [fromAddress.addressFeatureKey]: fromAddress.State;
    [fromCart.cartFeatureKey]: fromCart.State;
    [fromOrder.orderFeatureKey]: fromOrder.State;
    [fromPayment.paymentFeatureKey]: fromPayment.State;
}

export interface State extends fromRoot.State {
    [checkoutFeatureKey]: CheckoutState;
}

export function reducers(state: CheckoutState | undefined, action: Action) {
    return combineReducers({
        [fromAddress.addressFeatureKey]: fromAddress.reducer,
        [fromCart.cartFeatureKey]: fromCart.reducer,
        [fromOrder.orderFeatureKey]: fromOrder.reducer,
        [fromPayment.paymentFeatureKey]: fromPayment.reducer
    })(state, action);
}

export const getCheckoutState = createFeatureSelector<State, CheckoutState>(
    checkoutFeatureKey
);

//Address State
export const getAddressState = createSelector(
    getCheckoutState,
    (state: CheckoutState) => state.addresses
);

export const getAddressError = createSelector(
    getAddressState,
    fromAddress.getError
);

export const getAddressDefault = createSelector(
    getAddressState,
    fromAddress.getDefault
);

export const getAddressesFetched = createSelector(
    getAddressState,
    fromAddress.getAddresses
);

export const getAddressLoading = createSelector(
    getAddressState,
    fromAddress.getLoading
);

//Cart State
export const getCartState = createSelector(
    getCheckoutState,
    (state: CheckoutState) => state.cart
);

export const getCartError = createSelector(
    getCartState,
    fromCart.getError
);

export const getCartLoading = createSelector(
    getCartState,
    fromCart.getLoading
);

export const getCartTotalQuantity = createSelector(
    getCartState,
    fromCart.getTotalQuantity
);

export const getCartTotalPrice = createSelector(
    getCartState,
    fromCart.getCartPrice
);

export const getCartItemCount = createSelector(
    getCartState,
    fromCart.getItemCount
);

export const getCartProductIds = createSelector(
    getCartState,
    fromCart.getProductIds
);

export const getSelectedProductId = createSelector(
    getCartState,
    fromCart.getSelectedId
);

export const isSelectedProductInCart = createSelector(
    getCartProductIds,
    getSelectedProductId,
    (ids, selected) => {
        return !!selected && ids.indexOf(+selected) > -1;
    }
);
//Order State
export const getOrderState = createSelector(
    getCheckoutState,
    (state: CheckoutState) => state.order
);

export const getOrderError = createSelector(
    getOrderState,
    fromOrder.getError
);

export const getOrderFetched = createSelector(
    getOrderState,
    fromOrder.getOrders
);

export const getOrderCurrent = createSelector(
    getOrderState,
    fromOrder.getCurrentOrder
);


export const getOrderLoading = createSelector(
    getOrderState,
    fromOrder.getLoading
);

//Payment State
export const getPaymentState = createSelector(
    getCheckoutState,
    (state: CheckoutState) => state.payment
);

export const getPaymentError = createSelector(
    getPaymentState,
    fromPayment.getError
);

export const getPaymentLoading = createSelector(
    getPaymentState,
    fromPayment.getLoading
);

export const getPaymentCreatePaypal = createSelector(
    getPaymentState,
    fromPayment.getCreatePaypal
);

export const getPaymentPaypalRedirectUrl = createSelector(
    getPaymentCreatePaypal,
    (createPaypal)=> createPaypal.redirect_url
);


