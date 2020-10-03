import { createAction, props } from '@ngrx/store';

export const fetchBrandCollectionPage = createAction('[WebSitemap/API] Fetch Brand Collection Page');

export const fetchBrandCollectionPageSuccess = createAction(
  '[WebSitemap/API] Fetch Brand Collection Page Success',
  props<{ payload: any }>()
);

export const brandCollectionPageFailure = createAction('[WebSitemap/API] Brand Collection Page Failure', props<{ errorMsg: string }>());
