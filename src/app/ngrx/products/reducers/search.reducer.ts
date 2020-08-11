import { ProductActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';

export const searchFeatureKey = 'search';

export interface State {
  ids: number[];
  loading: boolean;
  error: string;
  keyword: string;
  links: any;
  totalItems: any;
  controllers: any;
  result: any;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  keyword: '',
  links: null,
  totalItems: null,
  controllers: null,
  result: null,
};

export const reducer = createReducer(
  initialState,
  on(ProductActions.searchProductsWithNoPaging, (state, { keyword }) =>
    keyword === ''
      ? {
          ids: [],
          loading: false,
          error: '',
          keyword,
        }
      : {
          ...state,
          loading: true,
          error: '',
          keyword,
        }
  ),
  on(ProductActions.searchProductsWithPaging, (state, { query }) =>
    !query
      ? {
          ids: [],
          loading: false,
          error: '',
          keyword: '',
        }
      : {
          ...state,
          loading: true,
          error: '',
          keyword: query.keyword,
        }
  ),
  on(ProductActions.filterProducts, (state, { query }) =>
    !query
      ? {
          ids: [],
          loading: false,
          error: '',
          keyword: '',
        }
      : {
          ...state,
          loading: true,
          error: '',
          keyword: query.tag,
        }
  ),
  on(ProductActions.searchWithNoPagingSuccess, (state, { products }) => ({
    ...state,
    ids: products?.map(product => product.id) || [],
    loading: false,
    error: '',
    keyword: state.keyword,
  })),
  on(ProductActions.filterProductsSuccess, (state, { payload }) => ({
    ...state,
    ids: payload.filteredResult?.map(product => product.id) || [],
    loading: false,
    error: '',
    totalItems: payload.pagination.totalCount,
    result: payload,
  })),
  on(ProductActions.filterControllersSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    error: '',
    controllers: payload,
  })),
  on(ProductActions.searchWithPagingSuccess, (state, { payload }) => ({
    ids: payload.products?.map(product => product.id) || [],
    loading: false,
    error: '',
    keyword: state.keyword,
    links: payload.links,
    totalItems: payload.totalItems,
  })),
  on(ProductActions.searchFailure, (state, { errorMsg }) => ({
    ...state,
    loading: false,
    error: errorMsg,
  }))
);

export const getIds = (state: State) => state.ids;

export const getKeyword = (state: State) => state.keyword;

export const getLoading = (state: State) => state.loading;

export const getLinks = (state: State) => state.links;

export const getTotalItems = (state: State) => state.totalItems;

export const getError = (state: State) => state.error;

export const getResult = (state: State) => state.result;

export const getControllers = (state: State) => state.controllers;
