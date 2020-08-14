import { createAction, props } from '@ngrx/store';

import { IProductCategory } from '@vertical/models';

export const selectCategory = createAction('[Product Tags/API] Select Category', props<{ id: number }>());

export const fetchCategoriesByTag = createAction('[Product Tags/API] Fetch Categories By Tag', props<{ query: any }>());

export const fetchCategoriesByTagSuccess = createAction(
  '[Product Tags/API] Fetch Categories By Tag Success',
  props<{ categories: IProductCategory[] }>()
);

export const fetchColorsByTag = createAction('[Product Tags/API] Fetch Colors By Tag', props<{ query: any }>());

export const fetchColorsByTagSuccess = createAction('[Product Tags/API] Fetch Colors By Tag Success', props<{ colors: any[] }>());

export const fetchBrandsByTag = createAction('[Product Tags/API] Fetch Brands By Tag', props<{ query: any }>());

export const fetchBrandsByTagSuccess = createAction('[Product Tags/API] Fetch Brands By Tag Success', props<{ brands: string[] }>());

export const fetchPriceRangeByTag = createAction('[Product Tags/API] Fetch Price Range By Tag', props<{ query: any }>());

export const fetchPriceRangeByTagSuccess = createAction(
  '[Product Tags/API] Fetch Price Range By Tag Success',
  props<{ priceRange: number[] }>()
);

export const fetchFailure = createAction('[Product Tags/API] Fetch Failure', props<{ errorMsg: string }>());
