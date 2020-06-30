import { createReducer, on } from '@ngrx/store';

import { ReviewActions } from 'app/ngrx/checkout/actions';
import { IReviews } from '@eps/models';

export const reviewFeatureKey = 'review';

export interface State {
  loaded: boolean;
  loading: boolean;
  reviews: IReviews;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  reviews: null,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(ReviewActions.fetchReviews, ReviewActions.saveReview, state => ({
    ...state,
    loading: true,
  })),
  on(ReviewActions.fetchReviewsSuccess, (state, { reviews }) => ({
    ...state,
    loaded: true,
    loading: false,
    reviews,
    error: '',
  })),
  on(ReviewActions.saveReviewSuccess, (state, { review }) => ({
    ...state,
    loaded: true,
    loading: false,
    reviews: review,
    error: '',
  })),
  on(ReviewActions.emptyReview, state => ({
    ...state,
    loaded: true,
    loading: false,
    reviews: null,
    error: '',
  })),
  on(ReviewActions.reviewError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getReviews = (state: State) => state.reviews;

export const getError = (state: State) => state.error;
