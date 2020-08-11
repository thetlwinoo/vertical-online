import { createAction, props } from '@ngrx/store';

export const fetchProductsHome = createAction('[Products/API] Fetch Products Home');

export const fetchProductsHomeSuccess = createAction('[Products/API] Fetch Products Home Success', props<{ payload: any }>());

export const productHomeFailure = createAction('[Products/API] Product Home Failure', props<{ errorMsg: string }>());
