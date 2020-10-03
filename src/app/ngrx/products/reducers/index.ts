/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IProducts } from '@vertical/models';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import * as fromSearch from 'app/ngrx/products/reducers/search.reducer';
import * as fromFetch from 'app/ngrx/products/reducers/fetch.reducer';
import * as fromProducts from 'app/ngrx/products/reducers/products.reducer';
import * as fromRoot from 'app/ngrx';
import * as fromCompare from 'app/ngrx/products/reducers/compare.reducer';
import * as fromWishlist from 'app/ngrx/products/reducers/wishlist.reducer';
import * as fromQuestions from 'app/ngrx/products/reducers/question.reducer';
import * as fromProductDetails from 'app/ngrx/products/reducers/product-details.reducer';
import * as fromRelatedProducts from 'app/ngrx/products/reducers/related-products.reducer';

export const productsFeatureKey = 'products';

export interface ProductsState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromProducts.productsFeatureKey]: fromProducts.State;
  [fromFetch.fetchFeatureKey]: fromFetch.State;
  [fromCompare.compareFeatureKey]: fromCompare.State;
  [fromWishlist.wishlistFeatureKey]: fromWishlist.State;
  [fromQuestions.questionFeatureKey]: fromQuestions.State;
  [fromProductDetails.productDetailsFeatureKey]: fromProductDetails.State;
  [fromRelatedProducts.relatedProductsFeatureKey]: fromRelatedProducts.State;
}

export interface State extends fromRoot.State {
  [productsFeatureKey]: ProductsState;
}

// export interface TagsState {
//     [fromTags.tagsFeatureKey]: fromTags.State;
//     [fromSearchTags.searchFeatureKey]: fromSearchTags.State;
// }

export function reducers(state: ProductsState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromProducts.productsFeatureKey]: fromProducts.reducer,
    [fromFetch.fetchFeatureKey]: fromFetch.reducer,
    [fromCompare.compareFeatureKey]: fromCompare.reducer,
    [fromWishlist.wishlistFeatureKey]: fromWishlist.reducer,
    [fromQuestions.questionFeatureKey]: fromQuestions.reducer,
    [fromProductDetails.productDetailsFeatureKey]: fromProductDetails.reducer,
    [fromRelatedProducts.relatedProductsFeatureKey]: fromRelatedProducts.reducer,
  })(state, action);
}

export const getProductsState = createFeatureSelector<State, ProductsState>(productsFeatureKey);

export const getProductEntitiesState = createSelector(getProductsState, state => state.products);

export const getSelectedProductId = createSelector(getProductEntitiesState, fromProducts.getSelectedId);

export const getSelectedStockItemId = createSelector(getProductEntitiesState, fromProducts.getSelectedStockItemId);

export const getSelectedStockItem = createSelector(getProductEntitiesState, fromProducts.getSelectedStockItem);

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
  getProductEntities,
  getSelectedProductId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSearchState = createSelector(getProductsState, (state: ProductsState) => state.search);

export const getSearchProductIds = createSelector(getSearchState, fromSearch.getIds);
export const getSearchKeyword = createSelector(getSearchState, fromSearch.getKeyword);
export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);
export const getSearchLinks = createSelector(getSearchState, fromSearch.getLinks);
export const getSearchTotalItems = createSelector(getSearchState, fromSearch.getTotalItems);
export const getSearchError = createSelector(getSearchState, fromSearch.getError);
export const getFilteredResult = createSelector(getSearchState, fromSearch.getResult);
export const getFilterControllers = createSelector(getSearchState, fromSearch.getControllers);

export const getSearchResults = createSelector(getProductEntities, getSearchProductIds, (products, searchIds) =>
  searchIds.map(id => products[id]).filter((product): product is IProducts => product != null)
);

// Fetch State
export const getFetchState = createSelector(getProductsState, (state: ProductsState) => state.fetch);

export const getFetchError = createSelector(getFetchState, fromFetch.getError);

export const getFetchLoading = createSelector(getFetchState, fromFetch.getFetchLoading);

export const getFetchNewlyAdded = createSelector(getFetchState, fromFetch.getNewlyAdded);

export const getFetchNewlyAddedLoading = createSelector(getFetchState, fromFetch.getNewlyAddedLoading);

export const getFetchMostSelling = createSelector(getFetchState, fromFetch.getMostSelling);

export const getFetchMostSellingLoading = createSelector(getFetchState, fromFetch.getMostSellingLoading);

export const getFetchInterested = createSelector(getFetchState, fromFetch.getInterested);

export const getFetchInterestedLoading = createSelector(getFetchState, fromFetch.getInterestedLoading);

export const getFetchDailyDiscover = createSelector(getFetchState, fromFetch.getDailyDiscover);

export const getFetchDailyDiscoverLoading = createSelector(getFetchState, fromFetch.getDailyDiscoverLoading);

// export const getFetchReviewLines = createSelector(getFetchState, fromFetch.getReviewLines);

// export const getFetchReviewLinesLoading = createSelector(getFetchState, fromFetch.getReviewLinesLoading);

export const getFetchPhotos = createSelector(getFetchState, fromFetch.getPhotos);

export const getFetchPhotosLoading = createSelector(getFetchState, fromFetch.getPhotosLoading);

export const getFetchCategories = createSelector(getFetchState, fromFetch.getCategories);

export const getFetchCategoriesLoading = createSelector(getFetchState, fromFetch.getCategoriesLoading);

export const getFetchCategoriesTree = createSelector(getFetchState, fromFetch.getCategoriesTree);

export const getFetchCategoriesTreeLoading = createSelector(getFetchState, fromFetch.getCategoriesTreeLoading);

export const getFetchStockItems = createSelector(getFetchState, fromFetch.getStockItems);

export const getFetchStockItemsLoading = createSelector(getFetchState, fromFetch.getStockItemsLoading);

export const getFetchProductDocument = createSelector(getFetchState, fromFetch.getProductDocument);

export const getFetchProductDocumentLoading = createSelector(getFetchState, fromFetch.getProductDocumentLoading);

export const getFetchReviewDetails = createSelector(getFetchState, fromFetch.getReviewDetails);

export const getFetchReviewDetailsLoading = createSelector(getFetchState, fromFetch.getReviewDetailsLoading);
// Wishlist
export const getWishlistState = createSelector(getProductsState, (state: ProductsState) => state.wishlist);

export const getWishlistLoaded = createSelector(getWishlistState, fromWishlist.getLoaded);
export const getWishlistLoading = createSelector(getWishlistState, fromWishlist.getLoading);
export const getWishlistStockItemIds = createSelector(getWishlistState, fromWishlist.getIds);

export const getWishlistStockItems = createSelector(getWishlistState, fromWishlist.getStockItems);

export const getWishlistCount = createSelector(getWishlistState, fromWishlist.getCount);

export const isSelectedStockItemInWishlist = createSelector(
  getWishlistStockItemIds,
  getSelectedStockItemId,
  (ids, selected) => !!selected && ids.includes(+selected)
);

// Compare
export const getCompareState = createSelector(getProductsState, (state: ProductsState) => state.compare);

export const getCompareLoaded = createSelector(getCompareState, fromCompare.getLoaded);
export const getCompareLoading = createSelector(getCompareState, fromCompare.getLoading);
export const getCompareStockItemIds = createSelector(getCompareState, fromCompare.getIds);

export const getCompareStockItems = createSelector(getCompareState, fromCompare.getStockItems);

export const getCompareCount = createSelector(getCompareState, fromCompare.getCount);

export const isSelectedStockItemInCompare = createSelector(
  getCompareStockItemIds,
  getSelectedStockItemId,
  (ids, selected) => !!selected && ids.includes(+selected)
);

export const getRelatedProductsState = createSelector(getProductsState, (state: ProductsState) => state.relatedProducts);
export const getRelatedProducts = createSelector(getRelatedProductsState, fromRelatedProducts.getProducts);
export const getRelatedProductsLoading = createSelector(getRelatedProductsState, fromRelatedProducts.getLoading);

// Questions
export const getQuestionsState = createSelector(getProductsState, (state: ProductsState) => state.question);
export const getQuestionsLoaded = createSelector(getQuestionsState, fromQuestions.getLoaded);
export const getQuestionsLoading = createSelector(getQuestionsState, fromQuestions.getLoading);
export const getQuestionsIds = createSelector(getQuestionsState, fromQuestions.getIds);
export const getQuestions = createSelector(getQuestionsState, fromQuestions.getQuestions);
export const getQuestionstCount = createSelector(getQuestionsState, fromQuestions.getCount);

// Product Details
export const getProductDetailsState = createSelector(getProductsState, (state: ProductsState) => state.productDetails);
export const getProductDetailsLoaded = createSelector(getProductDetailsState, fromProductDetails.getLoaded);
export const getProductDetailsLoading = createSelector(getProductDetailsState, fromProductDetails.getLoading);
export const getProductDetails = createSelector(getProductDetailsState, fromProductDetails.getProductDetails);
