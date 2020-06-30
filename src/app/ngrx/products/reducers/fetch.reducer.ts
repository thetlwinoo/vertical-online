import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import { IProducts, IReviewLines, IProductCategory, IStockItems, IPhotos } from '@eps/models';
import { IProductDocument } from '@eps/models/product-document.model';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export const fetchFeatureKey = 'fetch';

export interface State {
  newlyAdded: IProducts[];
  mostSelling: IProducts[];
  interested: IProducts[];
  dailyDiscover: IProducts[];
  // reviewLines: IReviewLines[];
  stockItems: IStockItems[];
  productDocument: IProductDocument;
  photos: IPhotos[];
  categories: IProductCategory[];
  categoriesTree: IProductCategory[];
  reviewDetails: IReviewLines[];
  newlyAddedLoading: boolean;
  mostSellingLoading: boolean;
  interestedLoading: boolean;
  dailyDiscoverLoading: boolean;
  // reviewLinesLoading: boolean;
  photosLoading: boolean;
  categoriesLoading: boolean;
  categoriesTreeLoading: boolean;
  stockItemsLoading: boolean;
  productDocumentLoading: boolean;
  reviewDetailsLoading: boolean;
  fetchLoading: boolean;
  error: string;
}

const initialState: State = {
  newlyAdded: [],
  mostSelling: [],
  interested: [],
  dailyDiscover: [],
  // reviewLines: [],
  stockItems: [],
  productDocument: null,
  photos: [],
  categories: [],
  categoriesTree: [],
  reviewDetails: [],
  newlyAddedLoading: false,
  mostSellingLoading: false,
  interestedLoading: false,
  dailyDiscoverLoading: false,
  // reviewLinesLoading: false,
  photosLoading: false,
  categoriesLoading: false,
  categoriesTreeLoading: false,
  stockItemsLoading: false,
  productDocumentLoading: false,
  reviewDetailsLoading: false,
  fetchLoading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(
    FetchActions.fetchNewlyAdded,
    FetchActions.fetchMostSelling,
    FetchActions.fetchInterested,
    FetchActions.fetchDailyDiscover,
    FetchActions.fetchReviewLines,
    FetchActions.fetchStockItems,
    FetchActions.fetchProductDocument,
    FetchActions.fetchPhotos,
    FetchActions.fetchCategories,
    FetchActions.fetchCategoriesTree,
    FetchActions.fetchReviewsDetails,

    state => ({
      ...state,
      newlyAddedLoading: true,
      mostSellingLoading: true,
      interestedLoading: true,
      dailyDiscoverLoading: true,
      reviewLinesLoading: true,
      stockItemsLoading: true,
      productDocumentLoading: true,
      photosLoading: true,
      categoriesLoading: true,
      categoriesTreeLoading: true,
      reviewDetailsLoading: true,
      fetchLoading: true,
      error: '',
    })
  ),
  on(FetchActions.fetchNewlyAddedSuccess, (state, { newlyAdded }) => ({
    ...state,
    newlyAdded,
    newlyAddedLoading: false,
    error: '',
  })),
  on(FetchActions.fetchMostSellingSuccess, (state, { mostSelling }) => ({
    ...state,
    mostSelling,
    mostSellingLoading: false,
    error: '',
  })),
  on(FetchActions.fetchInterestedSuccess, (state, { interested }) => ({
    ...state,
    interested,
    interestedLoading: false,
    error: '',
  })),
  on(FetchActions.fetchDailyDiscoverSuccess, (state, { dailyDiscover }) => ({
    ...state,
    dailyDiscover,
    dailyDiscoverLoading: false,
    error: '',
  })),
  // on(FetchActions.fetchReviewLinesSuccess, (state, { reviewLines }) => ({
  //   ...state,
  //   reviewLines,
  //   reviewLinesLoading: false,
  //   error: '',
  // })),
  on(FetchActions.fetchStockItemsSuccess, (state, { stockItems }) => ({
    ...state,
    stockItems,
    stockItemsLoading: false,
    error: '',
  })),
  on(FetchActions.fetchProductDocumentSuccess, (state, { productDocument }) => ({
    ...state,
    productDocument,
    productDocumentLoading: false,
    error: '',
  })),
  on(FetchActions.fetchPhotosSuccess, (state, { photos }) => ({
    ...state,
    photos,
    photosLoading: false,
    error: '',
  })),
  on(FetchActions.fetchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    categoriesLoading: false,
    error: '',
  })),
  on(FetchActions.fetchCategoriesTreeSuccess, (state, { categoriesTree }) => ({
    ...state,
    categoriesTree,
    categoriesTreeLoading: false,
    error: '',
  })),
  on(FetchActions.fetchReviewsDetailsSuccess, (state, { reviewDetails }) => ({
    ...state,
    reviewDetails,
    categoriesLoading: false,
    error: '',
  })),
  on(FetchActions.fetchFailure, (state, { errorMsg }) => ({
    ...state,
    fetchLoading: false,
    error: errorMsg,
  }))
);

export const getNewlyAdded = (state: State) => state.newlyAdded;

export const getMostSelling = (state: State) => state.mostSelling;

export const getInterested = (state: State) => state.interested;

export const getDailyDiscover = (state: State) => state.dailyDiscover;

// export const getReviewLines = (state: State) => state.reviewLines;

// export const getProductPhoto = (state: State) => state.photos;

export const getPhotos = (state: State) => state.photos;

export const getCategories = (state: State) => state.categories;

export const getCategoriesTree = (state: State) => state.categoriesTree;

export const getReviewDetails = (state: State) => state.reviewDetails;

export const getNewlyAddedLoading = (state: State) => state.newlyAddedLoading;

export const getMostSellingLoading = (state: State) => state.mostSellingLoading;

export const getInterestedLoading = (state: State) => state.interestedLoading;

export const getDailyDiscoverLoading = (state: State) => state.dailyDiscoverLoading;

// export const getReviewLinesLoading = (state: State) => state.reviewLinesLoading;

export const getPhotosLoading = (state: State) => state.photosLoading;

export const getCategoriesLoading = (state: State) => state.categoriesLoading;

export const getCategoriesTreeLoading = (state: State) => state.categoriesTreeLoading;

export const getStockItems = (state: State) => state.stockItems;

export const getStockItemsLoading = (state: State) => state.stockItemsLoading;

export const getProductDocument = (state: State) => state.productDocument;

export const getProductDocumentLoading = (state: State) => state.productDocumentLoading;

export const getReviewDetailsLoading = (state: State) => state.reviewDetailsLoading;

export const getFetchLoading = (state: State) => state.fetchLoading;

export const getError = (state: State) => state.error;
