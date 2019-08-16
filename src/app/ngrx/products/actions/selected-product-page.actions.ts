import { createAction, props } from '@ngrx/store';

import { IProducts } from '@root/models';


export const addProductToCompare = createAction(
    '[Selected Product Page] Add Product to Compare',
    props<{ product: IProducts }>()
);

export const removeProductFromCompare = createAction(
    '[Selected Product Page] Remove Product from Compare',
    props<{ product: IProducts }>()
);

export const addProductToWishlist = createAction(
    '[Selected Product Page] Add Product to Wishlist',
    props<{ product: IProducts }>()
);

export const removeProductFromWishlist = createAction(
    '[Selected Product Page] Remove Product from Wishlist',
    props<{ product: IProducts }>()
);
