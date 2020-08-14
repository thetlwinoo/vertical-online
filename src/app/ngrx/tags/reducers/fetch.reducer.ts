import { FetchActions } from 'app/ngrx/tags/actions';
import { createReducer, on } from '@ngrx/store';
import { IProductCategory } from '@vertical/models';

export const fetchFeatureKey = 'fetch';

export interface State {
  selectedCategoryId: number | null;
  categories: IProductCategory[];
  colors: string[];
  brands: string[];
  priceRange: number[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  selectedCategoryId: null,
  categories: [],
  loading: false,
  error: '',
  colors: [],
  brands: [],
  priceRange: [],
};

export const reducer = createReducer(
  initialState,
  on(FetchActions.fetchCategoriesByTag, state => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(FetchActions.selectCategory, (state, { id }) => ({
    ...state,
    selectedCategoryId: id,
  })),
  on(FetchActions.fetchCategoriesByTagSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchColorsByTagSuccess, (state, { colors }) => ({
    ...state,
    colors,
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchBrandsByTagSuccess, (state, { brands }) => ({
    ...state,
    brands: brands.filter(item => item.length > 0),
    loading: false,
    error: '',
  })),
  on(FetchActions.fetchPriceRangeByTagSuccess, (state, { priceRange }) => ({
    ...state,
    priceRange,
    loading: false,
    error: '',
  }))
);

export const getSelectedCategoryId = (state: State) => state.selectedCategoryId;

export const getCategories = (state: State) => state.categories;

export const getColors = (state: State) => state.colors;

export const getBrands = (state: State) => state.brands;

export const getPriceRange = (state: State) => state.priceRange;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
