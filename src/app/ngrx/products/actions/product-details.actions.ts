import { createAction, props } from '@ngrx/store';

export const fetchProductDetails = createAction('[Products Details/API] Fetch Product Details', props<{ id: number }>());

export const fetcProductDetailsSuccess = createAction(
  '[Products Details/API] Fetch Product Details Success',
  props<{ productDetails: any }>()
);

export const productDetailsError = createAction('[Products Details/API] Products Details Error', props<{ errorMsg: string }>());
