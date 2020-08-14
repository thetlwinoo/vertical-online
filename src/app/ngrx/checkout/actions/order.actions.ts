import { createAction, props } from '@ngrx/store';

import { IOrders } from '@vertical/models';

export const fetchOrder = createAction('[Orders/API] Fetch Order', props<{ query: any }>());

export const selectOrder = createAction('[Orders/API] Select Order', props<{ order: IOrders }>());

export const fetchOrderSuccess = createAction('[Orders/API] Fetch Order Success', props<{ payload: any }>());

export const postOrder = createAction('[Orders/API] Post Order', props<{ order: IOrders }>());

export const postOrderSuccess = createAction('[Orders/API] Post Order Success', props<{ order: IOrders }>());

export const saveOrder = createAction('[Orders/API] Save Order', props<{ order: IOrders }>());

export const emptyOrder = createAction('[Orders/API] Empty Order');

export const fetchCustomerOrdersReviews = createAction('[Orders/API] Fetch Customer Orders Reviews', props<{ query: any }>());

export const fetchCustomerOrdersReviewsSuccess = createAction(
  '[Orders/API] Fetch Customer Orders Reviews Success',
  props<{ payload: any }>()
);

export const fetchTrackOrder = createAction('[Orders/API] Fetch Track Order', props<{ query: any }>());

export const fetchTrackOrderSuccess = createAction('[Orders/API] Fetch Track Order Success', props<{ orders: IOrders[] }>());

export const orderError = createAction('[Orders/API] Order Error', props<{ errorMsg: string }>());
