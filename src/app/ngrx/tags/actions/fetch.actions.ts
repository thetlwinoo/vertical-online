import { createAction, props } from '@ngrx/store';

import { IProductCategory, IProductSubCategory } from '@root/models';

export const selectCategory = createAction(
    '[Product Tags/API] Select Category',
    props<{ id: number }>()
);

export const fetchSubCategoriesByTag = createAction(
    '[Product Tags/API] Fetch Sub Categories By Tag',
    props<{ query: any }>()
);

export const fetchSubCategoriesByTagSuccess = createAction(
    '[Product Tags/API] Fetch Sub Categories By Tag Success',
    props<{ subCategories: IProductSubCategory[] }>()
);

export const fetchColorsByTag = createAction(
    '[Product Tags/API] Fetch Colors By Tag',
    props<{ query: any }>()
);

export const fetchColorsByTagSuccess = createAction(
    '[Product Tags/API] Fetch Colors By Tag Success',
    props<{ colors: string[] }>()
);

export const fetchBrandsByTag = createAction(
    '[Product Tags/API] Fetch Brands By Tag',
    props<{ query: any }>()
);

export const fetchBrandsByTagSuccess = createAction(
    '[Product Tags/API] Fetch Brands By Tag Success',
    props<{ brands: string[] }>()
);

export const fetchPriceRangeByTag = createAction(
    '[Product Tags/API] Fetch Price Range By Tag',
    props<{ query: any }>()
);

export const fetchPriceRangeByTagSuccess = createAction(
    '[Product Tags/API] Fetch Price Range By Tag Success',
    props<{ priceRange: number[] }>()
);

export const fetchFailure = createAction(
    '[Product Tags/API] Fetch Failure',
    props<{ errorMsg: string }>()
);