import { createAction, props } from '@ngrx/store';

export const fetchFlashDealCollectionPage = createAction('[WebSitemap/API] Fetch Flash Deal Collection Page');

export const fetchFlashDealCollectionPageSuccess = createAction(
  '[WebSitemap/API] Fetch Flash Deal Collection Page Success',
  props<{ payload: any }>()
);

export const flashDealCollectionPageFailure = createAction(
  '[WebSitemap/API] Flash Deal Collection Page Failure',
  props<{ errorMsg: string }>()
);
