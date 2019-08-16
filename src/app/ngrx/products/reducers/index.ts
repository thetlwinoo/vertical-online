import { IProducts } from '@root/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromSearch from 'app/ngrx/products/reducers/search.reducer';
import * as fromFetch from 'app/ngrx/products/reducers/fetch.reducer';
import * as fromProducts from 'app/ngrx/products/reducers/products.reducer';
import * as fromRoot from 'app/ngrx';
import * as fromCompare from 'app/ngrx/products/reducers/compare.reducer';
import * as fromWishlist from 'app/ngrx/products/reducers/wishlist.reducer';

export const productsFeatureKey = 'products';

export interface ProductsState {
    [fromSearch.searchFeatureKey]: fromSearch.State;
    [fromProducts.productsFeatureKey]: fromProducts.State;
    [fromFetch.fetchFeatureKey]: fromFetch.State;
    [fromCompare.compareFeatureKey]: fromCompare.State;
    [fromWishlist.wishlistFeatureKey]: fromWishlist.State;
}

export interface State extends fromRoot.State {
    [productsFeatureKey]: ProductsState;
}

export function reducers(state: ProductsState | undefined, action: Action) {
    return combineReducers({
        [fromSearch.searchFeatureKey]: fromSearch.reducer,
        [fromProducts.productsFeatureKey]: fromProducts.reducer,
        [fromFetch.fetchFeatureKey]: fromFetch.reducer,
        [fromCompare.compareFeatureKey]: fromCompare.reducer,
        [fromWishlist.wishlistFeatureKey]: fromWishlist.reducer,
    })(state, action);
}

export const getProductsState = createFeatureSelector<State, ProductsState>(
    productsFeatureKey
);

export const getProductEntitiesState = createSelector(
    getProductsState,
    state => state.products
);

export const getSelectedProductId = createSelector(
    getProductEntitiesState,
    fromProducts.getSelectedId
);

export const {
    selectIds: getProductIds,
    selectEntities: getProductEntities,
    selectAll: getAllProducts,
    selectTotal: getTotalProducts,
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
    getProductEntities,
    getSelectedProductId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);


export const getSearchState = createSelector(
    getProductsState,
    (state: ProductsState) => state.search
);

export const getSearchProductIds = createSelector(
    getSearchState,
    fromSearch.getIds
);
export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);
export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
);

export const getSearchResults = createSelector(
    getProductEntities,
    getSearchProductIds,
    (products, searchIds) => {
        return searchIds
            .map(id => products[id])
            .filter((product): product is IProducts => product != null);
    }
);

//Fetch State
export const getFetchState = createSelector(
    getProductsState,
    (state: ProductsState) =>  state.fetch
);

export const getFetchError = createSelector(
    getFetchState,
    fromFetch.getError
);

export const getFetchLoading = createSelector(
    getFetchState,
    fromFetch.getLoading
);

export const getFetchNewlyAdded = createSelector(
    getFetchState,
    fromFetch.getNewlyAdded
);

export const getFetchMostSelling = createSelector(
    getFetchState,
    fromFetch.getMostSelling
);

export const getFetchInterested = createSelector(
    getFetchState,
    fromFetch.getInterested
);

export const getFetchDailyDiscover = createSelector(
    getFetchState,
    fromFetch.getDailyDiscover
);

export const getFetchRelatedProducts = createSelector(
    getFetchState,
    fromFetch.getRelatedProducts
);

export const getFetchReviewLines = createSelector(
    getFetchState,
    fromFetch.getReviewLines
);

export const getFetchProductPhoto = createSelector(
    getFetchState,
    fromFetch.getProductPhoto
);

//Wishlist
export const getWishlistState = createSelector(
    getProductsState,
    (state: ProductsState) => state.wishlist
);

export const getWishlistLoaded = createSelector(
    getWishlistState,
    fromWishlist.getLoaded
);
export const getWishlistLoading = createSelector(
    getWishlistState,
    fromWishlist.getLoading
);
export const getWishlistProductIds = createSelector(
    getWishlistState,
    fromWishlist.getIds
);

export const getProductWishlist = createSelector(
    getProductEntities,
    getWishlistProductIds,
    (entities, ids) => {
        return ids
            .map(id => entities[id])
            .filter((product): product is IProducts => product != null);
    }
);

export const isSelectedProductInWishlist = createSelector(
    getWishlistProductIds,
    getSelectedProductId,
    (ids, selected) => {
        return !!selected && ids.indexOf(+selected) > -1;
    }
);

//Compare
export const getCompareState = createSelector(
    getProductsState,
    (state: ProductsState) => state.compare
);

export const getCompareLoaded = createSelector(
    getCompareState,
    fromCompare.getLoaded
);
export const getCompareLoading = createSelector(
    getCompareState,
    fromCompare.getLoading
);
export const getCompareProductIds = createSelector(
    getCompareState,
    fromCompare.getIds
);

export const getProductCompare = createSelector(
    getProductEntities,
    getCompareProductIds,
    (entities, ids) => {
        return ids
            .map(id => entities[id])
            .filter((product): product is IProducts => product != null);
    }
);

export const isSelectedProductInCompare = createSelector(
    getCompareProductIds,
    getSelectedProductId,
    (ids, selected) => {        
        return !!selected && ids.indexOf(+selected) > -1;
    }
);