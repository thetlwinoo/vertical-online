import { createReducer, on } from '@ngrx/store';

import { ReviewLineActions } from 'app/ngrx/checkout/actions';
import { IReviewLines } from '@eps/models';

export const reviewLineFeatureKey = 'reviewLine';

export interface State {
  loaded: boolean;
  loading: boolean;
  reviewLines: IReviewLines[];
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  reviewLines: [],
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(ReviewLineActions.fetchReviewLines, ReviewLineActions.saveReviewLine, state => ({
    ...state,
    loading: true,
  })),
  on(ReviewLineActions.fetchReviewLinesSuccess, (state, { reviewLines }) => ({
    ...state,
    loaded: true,
    loading: false,
    reviewLines,
    error: '',
  })),
  on(ReviewLineActions.reviewLineError, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getReviewLines = (state: State) => state.reviewLines;

export const getError = (state: State) => state.error;
