import { createAction, props } from '@ngrx/store';

import { IProducts } from '@root/models';

export const loadProduct = createAction(
    '[Product Exists Guard] Load Product',
    props<{ product: IProducts }>()
);

export const searchProducts = createAction(
    '[Find Product] Search Products',
    props<{ query: string }>()
);

export const selectProduct = createAction(
    '[View Product] Select Product',
    props<{ id: number }>()
);

export const searchSuccess = createAction(
    '[Products/API] Search Success',
    props<{ products: IProducts[] }>()
);

export const searchFailure = createAction(
    '[Products/API] Search Failure',
    props<{ errorMsg: string }>()
);
