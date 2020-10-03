import { createAction, props } from '@ngrx/store';

export const fetchCategoriesPage = createAction('[WebSitemap/API] Fetch Categories Page', props<{ categoryId: number }>());

export const fetchCategoriesPageSuccess = createAction('[WebSitemap/API] Fetch Categories Page Success', props<{ payload: any }>());

export const categoriesPageFailure = createAction('[WebSitemap/API] Categories Page Failure', props<{ errorMsg: string }>());
