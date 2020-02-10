import { createAction, props } from '@ngrx/store';

import { IProducts } from '@eps/models';

export const addProductSuccess = createAction(
    '[Compare/API] Add Product Success',
    props<{ product: IProducts }>()
);

export const addProductFailure = createAction(
    '[Compare/API] Add Product Failure',
    props<{ product: IProducts }>()
);

export const removeProductSuccess = createAction(
    '[Compare/API] Remove Product Success',
    props<{ product: IProducts }>()
);

export const removeProductFailure = createAction(
    '[Compare/API] Remove Product Failure',
    props<{ product: IProducts }>()
);

export const loadProductsSuccess = createAction(
    '[Compare/API] Load Products Success',
    props<{ products: IProducts[] }>()
);

export const loadProductsFailure = createAction(
    '[Compare/API] Load Products Failure',
    props<{ error: any }>()
);

//Load Compare Action
export const loadCompare = createAction('[Compare Page] Load Compare');