import { FetchActions } from 'app/ngrx/products/actions';
import { createReducer, on } from '@ngrx/store';
import { IProducts, IReviewLines, IProductPhoto, IProductCategory, IProductSubCategory } from '@epm/models';

export const fetchFeatureKey = 'fetch';

export interface State {
    newlyAdded: IProducts[];
    mostSelling: IProducts[];
    interested: IProducts[];
    dailyDiscover: IProducts[];
    relatedProducts: IProducts[];
    reviewLines: IReviewLines[];
    photos: any[];
    categories: IProductCategory[];
    subCategories: IProductSubCategory[];
    loading: boolean;
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
    categories: [],
    subCategories: [],
    loading: false,
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
        (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
    ),
    on(FetchActions.fetchNewlyAddedSuccess, (state, { newlyAdded }) => ({
        ...state,
        newlyAdded: newlyAdded,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchMostSellingSuccess, (state, { mostSelling }) => ({
        ...state,
        mostSelling: mostSelling,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchInterestedSuccess, (state, { interested }) => ({
        ...state,
        interested: interested,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchDailyDiscoverSuccess, (state, { dailyDiscover }) => ({
        ...state,
        dailyDiscover: dailyDiscover,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchRelatedSuccess, (state, { related }) => ({
        ...state,
        relatedProducts: related,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchReviewLinesSuccess, (state, { reviewLines }) => ({
        ...state,
        reviewLines: reviewLines,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchProductPhotoSuccess, (state, { photos }) => ({
        ...state,
        photos: photos.map(photo => {
            return { source: photo.originalPhoto, alt: photo.productProductName, title: photo.productProductName };
        }),
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories: categories,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchSubCategoriesSuccess, (state, { subCategories }) => ({
        ...state,
        subCategories: subCategories,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchFailure, (state, { errorMsg }) => ({
        ...state,
        loading: false,
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

export const getSubCategories = (state: State) => state.subCategories;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;