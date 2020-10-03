import { createAction, props } from '@ngrx/store';

export const fetchCashBackPage = createAction('[WebSitemap/API] Fetch Cash Back Page');

export const fetchCashBackPageSuccess = createAction('[WebSitemap/API] Fetch Cash Back Page Success', props<{ payload: any }>());

export const cashBackPageFailure = createAction('[WebSitemap/API] Cash Back Page Failure', props<{ errorMsg: string }>());
