/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createReducer, on } from '@ngrx/store';

import { TermsAndConditionPageActions } from 'app/ngrx/web-sitemap/actions';

export const termsAndConditionPageFeatureKey = 'termsAndConditionPage';

export interface State {
  loaded: boolean;
  loading: boolean;
  payload: any;
  error: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  payload: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TermsAndConditionPageActions.fetchTermsAndConditionPage, state => ({
    ...state,
    loading: true,
  })),
  on(TermsAndConditionPageActions.fetchTermsAndConditionPageSuccess, (state, { payload }) => ({
    loaded: true,
    loading: false,
    payload,
  })),
  on(TermsAndConditionPageActions.termsAndConditionPageFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPayload = (state: State) => state.payload;

export const getError = (state: State) => state.error;
