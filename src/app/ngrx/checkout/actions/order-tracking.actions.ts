import { createAction, props } from '@ngrx/store';

import { IOrderTracking } from '@eps/models';

export const fetchOrderTracking = createAction('[Order Tracking/API] Fetch Order Tracking', props<{ query: any }>());

export const fetchOrderTrackingSuccess = createAction(
  '[Order Tracking/API] Fetch Order Tracking Success',
  props<{ orderTrackings: IOrderTracking[] }>()
);

export const orderTrackingError = createAction('[Order Tracking/API] Order Tracking Error', props<{ errorMsg: string }>());
