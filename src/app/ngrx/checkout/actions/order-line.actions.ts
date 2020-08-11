import { createAction, props } from '@ngrx/store';

import { IOrderLines } from '@eps/models';

export const fetchOrderLines = createAction('[Order Lines/API] Fetch Order Lines', props<{ orderPackageId: number }>());

export const fetchOrderLinesSuccess = createAction('[Order Lines/API] Fetch Order Lines Success', props<{ orderLines: IOrderLines[] }>());

export const saveOrderLine = createAction('[Order Lines/API] Save Order Line', props<{ orderLine: IOrderLines }>());

export const saveOrderLineList = createAction('[Order Lines/API] Save Order Line List', props<{ orderLineList: IOrderLines[] }>());

export const saveOrderLineSuccess = createAction('[Order Lines/API] Save Order Line Success', props<{ orderLine: IOrderLines }>());

export const saveOrderLineListSuccess = createAction('[Order Lines/API] Save Order Line List Success', props<{ success: boolean }>());

export const cancelOrderLine = createAction('[Order Lines/API] Cancel Order Line', props<{ id: number }>());

export const cancelOrderLineSuccess = createAction('[Order Lines/API] Cancel Order Line Success', props<{ response: any }>());

export const orderLineError = createAction('[Order LInes/API] Order Lines Error', props<{ errorMsg: string }>());
