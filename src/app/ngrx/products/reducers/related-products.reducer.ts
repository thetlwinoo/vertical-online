import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import { IProducts } from '@vertical/models';

export const relatedProductsFeatureKey = 'relatedProducts';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
  products: IProducts[];
  count: number;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  products: [],
  count: 0,
};

export const reducer = createReducer(
  initialState,
  on(FetchActions.fetchRelated, state => ({
    ...state,
    loading: true,
  })),
  on(FetchActions.fetchRelatedSuccess, (state, { products }) => ({
    loaded: true,
    loading: false,
    ids: products.map(product => product.id),
    products,
    count: products.length || 0,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getProducts = (state: State) => state.products;

export const getCount = (state: State) => state.count;
