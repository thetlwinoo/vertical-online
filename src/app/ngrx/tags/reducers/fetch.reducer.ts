import { FetchActions } from 'app/ngrx/tags/actions';
import { createReducer, on } from '@ngrx/store';
import { IProductCategory, IProductSubCategory } from '@epm/models';

export const fetchFeatureKey = 'fetch';

export interface State {
    selectedCategoryId: number | null;
    subCategories: IProductSubCategory[];
    colors: string[];
    brands: string[];
    priceRange: number[];
    loading: boolean;
    error: string;
}

const initialState: State = {
    selectedCategoryId: null,
    subCategories: [],
    loading: false,
    error: '',
    colors: [],
    brands: [],
    priceRange: []
};

export const reducer = createReducer(
    initialState,
    on(
        FetchActions.fetchSubCategoriesByTag,
        (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            };
        }
    ),
    on(FetchActions.selectCategory, (state, { id }) => ({
        ...state,
        selectedCategoryId: id,
    })),
    on(FetchActions.fetchSubCategoriesByTagSuccess, (state, { subCategories }) => ({
        ...state,
        subCategories: subCategories,
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchColorsByTagSuccess, (state, { colors }) => ({
        ...state,
        colors: colors.filter(item => item.length > 0),
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchBrandsByTagSuccess, (state, { brands }) => ({
        ...state,
        brands: brands.filter(item => item.length > 0),
        loading: false,
        error: ''
    })),
    on(FetchActions.fetchPriceRangeByTagSuccess, (state, { priceRange }) => ({
        ...state,
        priceRange: priceRange,
        loading: false,
        error: ''
    })),
)

export const getSelectedCategoryId = (state: State) => state.selectedCategoryId;

export const getSubCategories = (state: State) => state.subCategories;

export const getColors = (state: State) => state.colors;

export const getBrands = (state: State) => state.brands;

export const getPriceRange = (state: State) => state.priceRange;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;