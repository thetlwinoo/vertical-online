import { IProducts } from '@eps/models';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import * as fromAddress from 'app/ngrx/checkout/reducers/address.reducer';
import * as fromAddressType from 'app/ngrx/checkout/reducers/address-type.reducer';
import * as fromCart from 'app/ngrx/checkout/reducers/cart.reducer';
import * as fromOrder from 'app/ngrx/checkout/reducers/order.reducer';
import * as fromOrderPackage from 'app/ngrx/checkout/reducers/order-package.reducer';
import * as fromOrderLine from 'app/ngrx/checkout/reducers/order-lines.reducer';
import * as fromReview from 'app/ngrx/checkout/reducers/review.reducer';
import * as fromReviewLines from 'app/ngrx/checkout/reducers/review-lines.reducer';
import * as fromPayment from 'app/ngrx/checkout/reducers/payment.reducer';
import * as fromOrderTracking from 'app/ngrx/checkout/reducers/order-tracking.reducer';
import * as fromRoot from 'app/ngrx';

export const checkoutFeatureKey = 'checkout';

export interface CheckoutState {
  [fromAddress.addressFeatureKey]: fromAddress.State;
  [fromAddressType.addressTypeFeatureKey]: fromAddressType.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromOrder.orderFeatureKey]: fromOrder.State;
  [fromOrderPackage.orderPackageFeatureKey]: fromOrderPackage.State;
  [fromOrderLine.orderLinesFeatureKey]: fromOrderLine.State;
  [fromReview.reviewFeatureKey]: fromReview.State;
  [fromReviewLines.reviewLineFeatureKey]: fromReviewLines.State;
  [fromPayment.paymentFeatureKey]: fromPayment.State;
  [fromOrderTracking.orderTrackingFeatureKey]: fromOrderTracking.State;
}

export interface State extends fromRoot.State {
  [checkoutFeatureKey]: CheckoutState;
}

export function reducers(state: CheckoutState | undefined, action: Action) {
  return combineReducers({
    [fromAddress.addressFeatureKey]: fromAddress.reducer,
    [fromAddressType.addressTypeFeatureKey]: fromAddressType.reducer,
    [fromCart.cartFeatureKey]: fromCart.reducer,
    [fromOrder.orderFeatureKey]: fromOrder.reducer,
    [fromOrderPackage.orderPackageFeatureKey]: fromOrderPackage.reducer,
    [fromOrderLine.orderLinesFeatureKey]: fromOrderLine.reducer,
    [fromReview.reviewFeatureKey]: fromReview.reducer,
    [fromReviewLines.reviewLineFeatureKey]: fromReviewLines.reducer,
    [fromPayment.paymentFeatureKey]: fromPayment.reducer,
    [fromOrderTracking.orderTrackingFeatureKey]: fromOrderTracking.reducer,
  })(state, action);
}

export const getCheckoutState = createFeatureSelector<State, CheckoutState>(checkoutFeatureKey);

// Address State
export const getAddressState = createSelector(getCheckoutState, (state: CheckoutState) => state.addresses);

export const getAddressError = createSelector(getAddressState, fromAddress.getError);

export const getAddressDefault = createSelector(getAddressState, fromAddress.getDefault);

export const getAddressesFetched = createSelector(getAddressState, fromAddress.getAddresses);

export const getAddressLoading = createSelector(getAddressState, fromAddress.getLoading);

// Address Type State
export const getAddressTypeState = createSelector(getCheckoutState, (state: CheckoutState) => state.addressTypes);

export const getAddressTypeError = createSelector(getAddressTypeState, fromAddressType.getError);

export const getAddressTypeFetched = createSelector(getAddressTypeState, fromAddressType.getAddressTypes);

export const getAddressTypeLoading = createSelector(getAddressTypeState, fromAddressType.getLoading);

// Cart State
export const getCartState = createSelector(getCheckoutState, (state: CheckoutState) => state.cart);

export const getCartError = createSelector(getCartState, fromCart.getError);

export const getCartLoading = createSelector(getCartState, fromCart.getLoading);

export const getCartTotalQuantity = createSelector(getCartState, fromCart.getTotalQuantity);

export const getCartTotalPrice = createSelector(getCartState, fromCart.getCartPrice);

export const getCartItemCount = createSelector(getCartState, fromCart.getItemCount);

export const getCartStockItemIds = createSelector(getCartState, fromCart.getStockItemIds);

export const getSelectedStockItemId = createSelector(getCartState, fromCart.getSelectedId);

export const isSelectedStockItemInCart = createSelector(
  getCartStockItemIds,
  getSelectedStockItemId,
  (ids, selected) => !!selected && ids.includes(+selected)
);
// Order State
export const getOrderState = createSelector(getCheckoutState, (state: CheckoutState) => state.order);

export const getOrderError = createSelector(getOrderState, fromOrder.getError);

export const getOrderFetched = createSelector(getOrderState, fromOrder.getOrders);

export const getTrackOrderFetched = createSelector(getOrderState, fromOrder.getTrackOrders);

export const getTotalOrders = createSelector(getOrderState, fromOrder.getTotalOrders);

export const getReviewOrderFetched = createSelector(getOrderState, fromOrder.getReviewOrders);

export const getTotalReviewOrderFetched = createSelector(getOrderState, fromOrder.getTotalReviewOrders);

export const getSelectedOrder = createSelector(getOrderState, fromOrder.getSelected);

export const getOrderLoading = createSelector(getOrderState, fromOrder.getLoading);

// Order Package State
export const getOrderPackageState = createSelector(getCheckoutState, (state: CheckoutState) => state.orderPackage);

export const getOrderPackageError = createSelector(getOrderPackageState, fromOrderPackage.getError);

export const getOrderPackageFetched = createSelector(getOrderPackageState, fromOrderPackage.getOrderPackages);

export const getSelectedOrderPackage = createSelector(getOrderPackageState, fromOrderPackage.getSelected);

export const getOrderPackageLoading = createSelector(getOrderPackageState, fromOrderPackage.getLoading);

// Order Line State
export const getOrderLinesState = createSelector(getCheckoutState, (state: CheckoutState) => state.orderLines);

export const getOrderLinesError = createSelector(getOrderLinesState, fromOrderLine.getError);

export const getOrderLinesFetched = createSelector(getOrderLinesState, fromOrderLine.getOrderLines);

export const getOrderLineCurrent = createSelector(getOrderLinesState, fromOrderLine.getCurrentOrderLine);

export const getSaveOrderLineListSuccess = createSelector(getOrderLinesState, fromOrderLine.getSaveOrderLineListSuccess);

export const getOrderLinesLoading = createSelector(getOrderLinesState, fromOrderLine.getLoading);

// Review State
export const getReviewState = createSelector(getCheckoutState, (state: CheckoutState) => state.review);

export const getReviewError = createSelector(getReviewState, fromReview.getError);

export const getReviewFetched = createSelector(getReviewState, fromReview.getReviews);

export const getReviewLoading = createSelector(getReviewState, fromReview.getLoading);

// Review Line State
export const getReviewLinesState = createSelector(getCheckoutState, (state: CheckoutState) => state.reviewLine);

export const getReviewLinesError = createSelector(getReviewLinesState, fromReviewLines.getError);

export const getReviewLinesFetched = createSelector(getReviewLinesState, fromReviewLines.getReviewLines);

export const getReviewLinesLoading = createSelector(getReviewLinesState, fromReviewLines.getLoading);

// Payment State
export const getPaymentState = createSelector(getCheckoutState, (state: CheckoutState) => state.payment);

export const getPaymentError = createSelector(getPaymentState, fromPayment.getError);

export const getCreatePaypalLoading = createSelector(getPaymentState, fromPayment.getCreatePaypalLoading);

export const getCompletePaypalLoading = createSelector(getPaymentState, fromPayment.getCompletePaypalLoading);

export const getChargeStriptLoading = createSelector(getPaymentState, fromPayment.getChargeStriptLoading);

export const getCashOnDeliveryLoading = createSelector(getPaymentState, fromPayment.getCashOnDeliveryLoading);

export const getBankTransferLoading = createSelector(getPaymentState, fromPayment.getBankTransferLoading);

export const getPaymentCreatePaypal = createSelector(getPaymentState, fromPayment.getCreatePaypal);

export const getPaymentMethods = createSelector(getPaymentState, fromPayment.getPaymentMethods);

export const getPaymentMethodsLoading = createSelector(getPaymentState, fromPayment.getPaymentMethodsLoading);

export const getPaymentPaypalRedirectUrl = createSelector(getPaymentCreatePaypal, createPaypal => {
  if (createPaypal) {
    return createPaypal.redirect_url;
  }
});

// Order Tracking State
export const getOrderTrackingState = createSelector(getCheckoutState, (state: CheckoutState) => state.orderTracking);

export const getOrderTrackingError = createSelector(getOrderTrackingState, fromOrderTracking.getError);

export const getOrderTrackingFetched = createSelector(getOrderTrackingState, fromOrderTracking.getOrderTracking);

export const getOrderTrackingLoading = createSelector(getOrderTrackingState, fromOrderTracking.getLoading);
