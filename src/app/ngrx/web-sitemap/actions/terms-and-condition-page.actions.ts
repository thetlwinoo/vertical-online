import { createAction, props } from '@ngrx/store';

export const fetchTermsAndConditionPage = createAction('[WebSitemap/API] Fetch Terms And Condition Page');

export const fetchTermsAndConditionPageSuccess = createAction(
  '[WebSitemap/API] Fetch Terms And Condition Page Success',
  props<{ payload: any }>()
);

export const termsAndConditionPageFailure = createAction(
  '[WebSitemap/API] Terms And Condition Page Failure',
  props<{ errorMsg: string }>()
);
