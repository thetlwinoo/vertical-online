import { createAction, props } from '@ngrx/store';

export const fetchSearchPage = createAction('[WebSitemap/API] Fetch Search Page');

export const fetchSearchPageSuccess = createAction('[WebSitemap/API] Fetch Search Page Success', props<{ payload: any }>());

export const searchPageFailure = createAction('[WebSitemap/API] Search Page Failure', props<{ errorMsg: string }>());
