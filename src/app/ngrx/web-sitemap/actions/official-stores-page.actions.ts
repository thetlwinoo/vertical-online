import { createAction, props } from '@ngrx/store';

export const fetchOfficialStoresPage = createAction('[WebSitemap/API] Fetch Official Stores Page');

export const fetchOfficialStoresPageSuccess = createAction(
  '[WebSitemap/API] Fetch Official Stores Page Success',
  props<{ payload: any }>()
);

export const officialStoresPageFailure = createAction('[WebSitemap/API] Official Stores Page Failure', props<{ errorMsg: string }>());
