import { IProducts } from '@root/models';
import * as BrowseActions from "./browse.actions";
import { HttpError } from "../app.reducers";


export interface Category {
  id: number,
  name: string
}

export interface State {
  products: IProducts[];
  categories: Category[];
  canFetch: boolean;
  selectedPage: number;
  selectedSort: string;
  selectedCategory: string;
  errors: HttpError[];
  loading: boolean;
}

const initialState: State = {
  products: [],
  categories: [],
  canFetch: true,
  selectedPage: 0,
  selectedSort: 'any',
  selectedCategory: 'any',
  errors: [],
  loading: false
};

export function browseReducer(state = initialState, action: BrowseActions.BrowseActions) {
  switch (action.type) {
    case (BrowseActions.FETCH_PRODUCTS_APPEND):
    case (BrowseActions.FETCH_PRODUCTS):
    case (BrowseActions.SEARCH_PRODUCTS):
    case (BrowseActions.SEARCH_PRODUCTS_PAGING):
      return {
        ...state,
        loading: true
      };

    case (BrowseActions.SEARCH_PRODUCTS_SUCCESS):
      let searchProductsErrorClear = state.errors;
      for (let i = 0; i < searchProductsErrorClear.length; i++) {
        if (searchProductsErrorClear[i].errorEffect === 'SEARCH_PRODUCTS') {
          searchProductsErrorClear = searchProductsErrorClear.splice(i, 1);
        }
      }

      return {
        ...state,
        products: action.payload,
        errors: searchProductsErrorClear,
        loading: false
      };

    case (BrowseActions.SEARCH_PRODUCTS_PAGING_SUCCESS):
      let searchProductsPagingErrorClear = state.errors;
      for (let i = 0; i < searchProductsPagingErrorClear.length; i++) {
        if (searchProductsPagingErrorClear[i].errorEffect === 'SEARCH_PRODUCTS_PAGING') {
          searchProductsPagingErrorClear = searchProductsPagingErrorClear.splice(i, 1);
        }
      }

      return {
        ...state,
        products: action.payload,
        errors: searchProductsPagingErrorClear,
        loading: false
      };

    case (BrowseActions.FETCH_PRODUCTS_SUCCESS):
      let fetchProductsErrorClear = state.errors;
      for (let i = 0; i < fetchProductsErrorClear.length; i++) {
        if (fetchProductsErrorClear[i].errorEffect === 'FETCH_PRODUCTS') {
          fetchProductsErrorClear = fetchProductsErrorClear.splice(i, 1);
        }
      }

      if (action.payload.res.length == 0) {
        return {
          ...state,
          selectedPage: action.payload.selectedPage,
          selectedSort: action.payload.selectedSort,
          selectedCategory: action.payload.selectedCategory,
          canFetch: false,
          errors: fetchProductsErrorClear,
          loading: false
        }
      }
      return {
        ...state,
        selectedPage: action.payload.selectedPage,
        selectedSort: action.payload.selectedSort,
        selectedCategory: action.payload.selectedCategory,
        products: action.payload.res,
        canFetch: true,
        errors: fetchProductsErrorClear,
        loading: false
      };

    case (BrowseActions.FETCH_PRODUCTS_APPEND_SUCCESS):
      let fetchProductsAppendErrorClear = state.errors;
      for (let i = 0; i < fetchProductsAppendErrorClear.length; i++) {
        if (fetchProductsAppendErrorClear[i].errorEffect === 'FETCH_PRODUCTS_APPEND') {
          fetchProductsAppendErrorClear = fetchProductsAppendErrorClear.splice(i, 1);
        }
      }
      if (action.payload.res.length == 0) {
        return {
          ...state,
          selectedPage: action.payload.selectedPage,
          selectedSort: action.payload.selectedSort,
          selectedCategory: action.payload.selectedCategory,
          canFetch: false,
          errors: fetchProductsAppendErrorClear,
          loading: false
        }
      }
      return {
        ...state,
        selectedPage: action.payload.selectedPage,
        selectedSort: action.payload.selectedSort,
        selectedCategory: action.payload.selectedCategory,
        products: [...state.products, ...action.payload.res],
        errors: fetchProductsAppendErrorClear,
        loading: false
      };

    case (BrowseActions.FETCH_CATEGORY_SUCCESS):
      let fetchCategoryErrorClear = state.errors;
      for (let i = 0; i < fetchCategoryErrorClear.length; i++) {
        if (fetchCategoryErrorClear[i].errorEffect === 'FETCH_CATEGORY') {
          fetchCategoryErrorClear = fetchCategoryErrorClear.splice(i, 1);
        }
      }
      return {
        ...state,
        categories: action.payload,
        errors: fetchCategoryErrorClear
      };

    case (BrowseActions.BROWSE_ERROR):
      let browseErrorPush = state.errors;
      for (let i = 0; i < browseErrorPush.length; i++) {
        if (browseErrorPush[i].errorEffect === action.payload.errorEffect) {
          browseErrorPush[i] = action.payload;
          return {
            ...state,
            errors: browseErrorPush,
            loading: false
          };
        }
      }
      browseErrorPush.push(action.payload);
      return {
        ...state,
        errors: browseErrorPush,
        loading: false
      };

    default:
      return state;
  }
}
