import { createReducer, on } from '@ngrx/store';

import {
    CompareActions
} from 'app/ngrx/products/actions';
import { IProducts } from '@root/models';

export const compareFeatureKey = 'compare';

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: number[];
    products: IProducts[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
    products: []
};

export const reducer = createReducer(
    initialState,
    on(CompareActions.loadCompare, state => ({
        ...state,
        loading: true,
    })),
    on(CompareActions.loadProductsSuccess, (state, { products }) => ({
        loaded: true,
        loading: false,
        ids: products.map(product => product.id),
        products: products
    })),
    // Supports handing multiple types of actions
    on(
        CompareActions.addProductSuccess,
        CompareActions.removeProductFailure,
        (state, { product }) => {
            if (state.ids.indexOf(product.id) > -1) {
                return state;
            }
            return {
                ...state,
                ids: [...state.ids, product.id],
                products: [...state.products, product],
            };
        }
    ),
    on(
        CompareActions.removeProductSuccess,
        CompareActions.addProductFailure,
        (state, { product }) => ({
            ...state,
            ids: state.ids.filter(id => id !== product.id),
            products: state.products.filter(p => p.id !== product.id),
        })
    )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getProducts = (state: State) => state.products;