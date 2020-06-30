import { createAction, props } from '@ngrx/store';

import { IReviews } from '@eps/models';

export const fetchReviews = createAction('[Reviews/API] Fetch Reviews', props<{ id: number }>());

export const fetchReviewsSuccess = createAction('[Reviews/API] Fetch Reviews Success', props<{ reviews: IReviews }>());

export const saveReview = createAction('[Reviews/API] Save Reviews', props<{ review: IReviews }>());

export const saveReviewSuccess = createAction('[Reviews/API] Save Reviews Success', props<{ review: IReviews }>());

export const emptyReview = createAction('[Reviews/API] Empty Reviews');

export const reviewError = createAction('[Reviews/API] Review Error', props<{ errorMsg: string }>());
