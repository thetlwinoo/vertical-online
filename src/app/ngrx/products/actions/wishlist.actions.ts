import { createAction, props } from '@ngrx/store';

import { IProducts } from '@epm/models';

export const addProductSuccess = createAction(
    '[Wishlist/API] Add Product Success',
    props<{ product: IProducts }>()
);

export const addProductFailure = createAction(
    '[Wishlist/API] Add Product Failure',
    props<{ product: IProducts }>()
);

export const removeProductSuccess = createAction(
    '[Wishlist/API] Remove Product Success',
    props<{ product: IProducts }>()
);

export const removeProductFailure = createAction(
    '[Wishlist/API] Remove Product Failure',
    props<{ product: IProducts }>()
);

export const loadProductsSuccess = createAction(
    '[Wishlist/API] Load Products Success',
    props<{ products: IProducts[] }>()
);

export const loadProductsFailure = createAction(
    '[Wishlist/API] Load Products Failure',
    props<{ error: any }>()
);

//Load Wishlist Action
export const loadWishlist = createAction('[Wishlist Page] Load Wishlist');