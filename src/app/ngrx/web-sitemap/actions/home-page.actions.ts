import { createAction, props } from '@ngrx/store';

export const fetchHomePage = createAction('[WebSitemap/API] Fetch Home Page');

export const fetchHomePageSuccess = createAction('[WebSitemap/API] Fetch Home Page Success', props<{ payload: any }>());

export const homePageFailure = createAction('[WebSitemap/API] Home Page Failure', props<{ errorMsg: string }>());
