/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createReducer, on } from '@ngrx/store';

import { HomePageActions } from 'app/ngrx/web-sitemap/actions';

export const homePageFeatureKey = 'homePage';

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
  on(HomePageActions.fetchHomePage, state => ({
    ...state,
    loading: true,
  })),
  on(HomePageActions.fetchHomePageSuccess, (state, { payload }) => ({
    loaded: true,
    loading: false,
    payload,
  })),
  on(HomePageActions.homePageFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPayload = (state: State) => state.payload;

export const getError = (state: State) => state.error;
