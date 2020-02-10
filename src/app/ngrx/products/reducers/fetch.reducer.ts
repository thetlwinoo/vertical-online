import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import { IProducts, IReviewLines, IProductPhoto, IProductCategory, IProductSubCategory, IStockItems } from '@eps/models';

export const fetchFeatureKey = 'fetch';

export interface State {
    newlyAdded: IProducts[];
    mostSelling: IProducts[];
    interested: IProducts[];
    dailyDiscover: IProducts[];
    relatedProducts: IProducts[];
    reviewLines: IReviewLines[];
    photos: any[];
    stockItems: IStockItems[];
    categories: IProductCategory[];
    newlyAddedLoading: boolean;
    mostSellingLoading: boolean;
    interestedLoading: boolean;
    dailyDiscoverLoading: boolean;
    relatedProductsLoading: boolean;
    reviewLinesLoading: boolean;
    photosLoading: boolean;
    categoriesLoading: boolean;
    stockItemsLoading: boolean;
    fetchLoading: boolean;
    error: string;
}

const initialState: State = {
    newlyAdded: [],
    mostSelling: [],
    interested: [],
    dailyDiscover: [],
    relatedProducts: [],
    reviewLines: [],
    photos: [],
    stockItems: [],
    categories: [],
    newlyAddedLoading: false,
    mostSellingLoading: false,
    interestedLoading: false,
    dailyDiscoverLoading: false,
    relatedProductsLoading: false,
    reviewLinesLoading: false,
    photosLoading: false,
    categoriesLoading: false,
    stockItemsLoading: false,
    fetchLoading: false,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(
        FetchActions.fetchNewlyAdded,
        FetchActions.fetchMostSelling,
        FetchActions.fetchInterested,
        FetchActions.fetchDailyDiscover,
        FetchActions.fetchRelated,
        FetchActions.fetchReviewLines,
        FetchActions.fetchProductPhoto,
        FetchActions.fetchCategories,
        FetchActions.fetchStockItems,
        (state) => {
            return {
                ...state,
                newlyAddedLoading: true,
                mostSellingLoading: true,
                interestedLoading: true,
                dailyDiscoverLoading: true,
                relatedProductsLoading: true,
                reviewLinesLoading: true,
                photosLoading: true,
                categoriesLoading: true,
                stockItemsLoading: true,
                fetchLoading: true,
                error: ''
            };
        }
    ),
    on(FetchActions.fetchNewlyAddedSuccess, (state, { newlyAdded }) => ({
        ...state,
        newlyAdded: newlyAdded,
        newlyAddedLoading: false,
        error: ''
    })),
    on(FetchActions.fetchMostSellingSuccess, (state, { mostSelling }) => ({
        ...state,
        mostSelling: mostSelling,
        mostSellingLoading: false,
        error: ''
    })),
    on(FetchActions.fetchInterestedSuccess, (state, { interested }) => ({
        ...state,
        interested: interested,
        interestedLoading: false,
        error: ''
    })),
    on(FetchActions.fetchDailyDiscoverSuccess, (state, { dailyDiscover }) => ({
        ...state,
        dailyDiscover: dailyDiscover,
        dailyDiscoverLoading: false,
        error: ''
    })),
    on(FetchActions.fetchRelatedSuccess, (state, { related }) => ({
        ...state,
        relatedProducts: related,
        relatedProductsLoading: false,
        error: ''
    })),
    on(FetchActions.fetchReviewLinesSuccess, (state, { reviewLines }) => ({
        ...state,
        reviewLines: reviewLines,
        reviewLinesLoading: false,
        error: ''
    })),
    on(FetchActions.fetchProductPhotoSuccess, (state, { photos }) => ({
        ...state,
        photos: photos.map(photo => {
            return { source: photo.originalPhoto, alt: photo.productProductName, title: photo.productProductName };
        }),
        photosLoading: false,
        error: ''
    })),
    on(FetchActions.fetchCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        categoriesLoading: false,
        error: ''
    })),
    on(FetchActions.fetchStockItemsSuccess, (state, { stockItems }) => ({
        ...state,
        stockItems: stockItems,
        stockItemsLoading: false,
        error: ''
    })),
    on(FetchActions.fetchFailure, (state, { errorMsg }) => ({
        ...state,
        fetchLoading: false,
        error: errorMsg
    }))
);


export const getNewlyAdded = (state: State) => state.newlyAdded;

export const getMostSelling = (state: State) => state.mostSelling;

export const getInterested = (state: State) => state.interested;

export const getDailyDiscover = (state: State) => state.dailyDiscover;

export const getRelatedProducts = (state: State) => state.relatedProducts;

export const getReviewLines = (state: State) => state.reviewLines;

export const getProductPhoto = (state: State) => state.photos;

export const getCategories = (state: State) => state.categories;

export const getNewlyAddedLoading = (state: State) => state.newlyAddedLoading;

export const getMostSellingLoading = (state: State) => state.mostSellingLoading;

export const getInterestedLoading = (state: State) => state.interestedLoading;

export const getDailyDiscoverLoading = (state: State) => state.dailyDiscoverLoading;

export const getRelatedProductsLoading = (state: State) => state.relatedProductsLoading;

export const getReviewLinesLoading = (state: State) => state.reviewLinesLoading;

export const getPhotosLoading = (state: State) => state.photosLoading;

export const getCategoriesLoading = (state: State) => state.categoriesLoading;

export const getStockItems = (state: State) => state.stockItems;

export const getStockItemsLoading = (state: State) => state.stockItemsLoading;

export const getFetchLoading = (state: State) => state.fetchLoading;

export const getError = (state: State) => state.error;