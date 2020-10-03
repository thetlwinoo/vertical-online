/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IProductCategory } from '@vertical/models';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import * as fromRoot from 'app/ngrx';
import * as fromHomePage from 'app/ngrx/web-sitemap/reducers/home-page.reducer';
import * as fromFlashDealCollectionPage from 'app/ngrx/web-sitemap/reducers/flash-deal-collection-page.reducer';
import * as fromBrandCollectionPage from 'app/ngrx/web-sitemap/reducers/brand-collection-page.reducer';
import * as fromCashBackPage from 'app/ngrx/web-sitemap/reducers/cash-back-page.reducer';
import * as fromCategoriesPage from 'app/ngrx/web-sitemap/reducers/categories-page.reducer';
import * as fromCollectVoucherPage from 'app/ngrx/web-sitemap/reducers/collect-voucher-page.reducer';
import * as fromOfficialStoresPage from 'app/ngrx/web-sitemap/reducers/official-stores-page.reducer';
import * as fromSearchPage from 'app/ngrx/web-sitemap/reducers/search-page.reducer';
import * as fromTermsAndConditionPage from 'app/ngrx/web-sitemap/reducers/terms-and-condition-page.reducer';

export const webSitemapFeatureKey = 'webSitemap';

export interface WebSitemapState {
  [fromHomePage.homePageFeatureKey]: fromHomePage.State;
  [fromFlashDealCollectionPage.flashDealCollectionPageFeatureKey]: fromHomePage.State;
  [fromBrandCollectionPage.brandCollectionPageFeatureKey]: fromBrandCollectionPage.State;
  [fromCashBackPage.cashBackPageFeatureKey]: fromCashBackPage.State;
  [fromCategoriesPage.categoriesPageFeatureKey]: fromCategoriesPage.State;
  [fromCollectVoucherPage.collectVoucherPageFeatureKey]: fromCollectVoucherPage.State;
  [fromOfficialStoresPage.officialStoresPageFeatureKey]: fromOfficialStoresPage.State;
  [fromSearchPage.searchPageFeatureKey]: fromSearchPage.State;
  [fromTermsAndConditionPage.termsAndConditionPageFeatureKey]: fromTermsAndConditionPage.State;
}

export interface State extends fromRoot.State {
  [webSitemapFeatureKey]: WebSitemapState;
}

export function reducers(state: WebSitemapState | undefined, action: Action) {
  return combineReducers({
    [fromHomePage.homePageFeatureKey]: fromHomePage.reducer,
    [fromFlashDealCollectionPage.flashDealCollectionPageFeatureKey]: fromFlashDealCollectionPage.reducer,
    [fromBrandCollectionPage.brandCollectionPageFeatureKey]: fromBrandCollectionPage.reducer,
    [fromCashBackPage.cashBackPageFeatureKey]: fromCashBackPage.reducer,
    [fromCategoriesPage.categoriesPageFeatureKey]: fromCategoriesPage.reducer,
    [fromCollectVoucherPage.collectVoucherPageFeatureKey]: fromCollectVoucherPage.reducer,
    [fromOfficialStoresPage.officialStoresPageFeatureKey]: fromOfficialStoresPage.reducer,
    [fromSearchPage.searchPageFeatureKey]: fromSearchPage.reducer,
    [fromTermsAndConditionPage.termsAndConditionPageFeatureKey]: fromTermsAndConditionPage.reducer,
  })(state, action);
}

export const getWebSitemapState = createFeatureSelector<State, WebSitemapState>(webSitemapFeatureKey);

// Home Page
export const getHomePageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.homePage);
export const getHomePageLoaded = createSelector(getHomePageState, fromHomePage.getLoaded);
export const getHomePageLoading = createSelector(getHomePageState, fromHomePage.getLoading);
export const getHomePage = createSelector(getHomePageState, fromHomePage.getPayload);
export const getHomePageError = createSelector(getHomePageState, fromHomePage.getError);
export const getJustForYouCateogries = createSelector(getHomePage, payload => payload.justForYou);

export const getFetchBundles = createSelector(getHomePage, payload => {
  if (payload && payload.justForYou) {
    const bundles: IProductCategory[] = payload.justForYou
      // .filter(item => item.justForYouInd === true)
      .reduce((rows, key, index) => (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, []);
    return bundles;
  }
});

// Flash Deal Collection Page
export const getFlashDealCollectionPageState = createSelector(
  getWebSitemapState,
  (state: WebSitemapState) => state.flashDealCollectionPage
);
export const getFlashDealCollectionPageLoaded = createSelector(getFlashDealCollectionPageState, fromFlashDealCollectionPage.getLoaded);
export const getFlashDealCollectionPageLoading = createSelector(getFlashDealCollectionPageState, fromFlashDealCollectionPage.getLoading);
export const getFlashDealCollectionPage = createSelector(getFlashDealCollectionPageState, fromFlashDealCollectionPage.getPayload);
export const getFlashDealCollectionPageError = createSelector(getFlashDealCollectionPageState, fromFlashDealCollectionPage.getError);

// Brand Collection Page
export const getBrandCollectionPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.brandCollectionPage);
export const getBrandCollectionPageLoaded = createSelector(getBrandCollectionPageState, fromHomePage.getLoaded);
export const getBrandCollectionPageLoading = createSelector(getBrandCollectionPageState, fromHomePage.getLoading);
export const getBrandCollectionPage = createSelector(getBrandCollectionPageState, fromHomePage.getPayload);
export const getBrandCollectionPageError = createSelector(getBrandCollectionPageState, fromHomePage.getError);

// Cash Back Page
export const getCashBackPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.cashBackPage);
export const getCashBackPageLoaded = createSelector(getCashBackPageState, fromHomePage.getLoaded);
export const getCashBackPageLoading = createSelector(getCashBackPageState, fromHomePage.getLoading);
export const getCashBackPage = createSelector(getCashBackPageState, fromHomePage.getPayload);
export const getCashBackPageError = createSelector(getCashBackPageState, fromHomePage.getError);
export const getCashBackCateogries = createSelector(getCashBackPage, payload => payload.cashBackCategories);

// Categories Page
export const getCategoriesPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.categoriesPage);
export const getCategoriesPageLoaded = createSelector(getCategoriesPageState, fromHomePage.getLoaded);
export const getCategoriesPageLoading = createSelector(getCategoriesPageState, fromHomePage.getLoading);
export const getCategoriesPage = createSelector(getCategoriesPageState, fromHomePage.getPayload);
export const getCategoriesPageError = createSelector(getCategoriesPageState, fromHomePage.getError);

// Collect Voucher Page
export const getCollectVoucherPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.collectVoucherPage);
export const getCollectVoucherPageLoaded = createSelector(getCollectVoucherPageState, fromHomePage.getLoaded);
export const getCollectVoucherPageLoading = createSelector(getCollectVoucherPageState, fromHomePage.getLoading);
export const getCollectVoucherPage = createSelector(getCollectVoucherPageState, fromHomePage.getPayload);
export const getCollectVoucherPageError = createSelector(getCollectVoucherPageState, fromHomePage.getError);
export const getCollectVoucherCateogries = createSelector(getCollectVoucherPage, payload => payload.collectVoucherCategories);

// Official Stores Page
export const getOfficialStoresPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.officialStoresPage);
export const getOfficialStoresPageLoaded = createSelector(getOfficialStoresPageState, fromHomePage.getLoaded);
export const getOfficialStoresPageLoading = createSelector(getOfficialStoresPageState, fromHomePage.getLoading);
export const getOfficialStoresPage = createSelector(getOfficialStoresPageState, fromHomePage.getPayload);
export const getOfficialStoresPageError = createSelector(getOfficialStoresPageState, fromHomePage.getError);
export const getOfficialStoresCateogries = createSelector(getOfficialStoresPage, payload => payload.officialStoresCategories);

// Search Page
export const getSearchPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.searchPage);
export const getSearchPageLoaded = createSelector(getSearchPageState, fromHomePage.getLoaded);
export const getSearchPageLoading = createSelector(getSearchPageState, fromHomePage.getLoading);
export const getSearchPage = createSelector(getSearchPageState, fromHomePage.getPayload);
export const getSearchPageError = createSelector(getSearchPageState, fromHomePage.getError);

// Terms And Condition Page
export const getTermsAndConditionPageState = createSelector(getWebSitemapState, (state: WebSitemapState) => state.termsAndConditionPage);
export const getTermsAndConditionPageLoaded = createSelector(getTermsAndConditionPageState, fromHomePage.getLoaded);
export const getTermsAndConditionPageLoading = createSelector(getTermsAndConditionPageState, fromHomePage.getLoading);
export const getTermsAndConditionPage = createSelector(getTermsAndConditionPageState, fromHomePage.getPayload);
export const getTermsAndConditionPageError = createSelector(getTermsAndConditionPageState, fromHomePage.getError);
