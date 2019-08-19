import { createAction, props } from '@ngrx/store';

import { IOrders } from '@root/models';

export const fetchOrder = createAction('[Orders/API] Fetch Order');

export const fetchOrderSuccess = createAction(
    '[Orders/API] Fetch Order Success',
    props<{ orders: IOrders[] }>()
);

export const postOrder = createAction(
    '[Orders/API] Post Order',
    props<{ order: IOrders }>()
);

export const postOrderSuccess = createAction(
    '[Orders/API] Post Order Success',
    props<{ order: IOrders }>()
);

export const emptyOrder = createAction('[Orders/API] Empty Order');

export const orderError = createAction(
    '[Orders/API] Order Error',
    props<{ errorMsg: string }>()
);