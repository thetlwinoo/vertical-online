import { Action } from '@ngrx/store';
import { Category } from "./browse.reducer";
import { HttpError } from "../app.reducers";
import { IProducts } from '@root/models';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS_PAGING = 'SEARCH_PRODUCTS_PAGING';
export const SEARCH_PRODUCTS_PAGING_SUCCESS = 'SEARCH_PRODUCTS_PAGING_SUCCESS';
export const FETCH_PRODUCTS_APPEND = 'FETCH_PRODUCTS_APPEND';
export const FETCH_PRODUCTS_APPEND_SUCCESS = 'FETCH_PRODUCTS_APPEND_SUCCESS';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const BROWSE_ERROR = 'BROWSE_ERROR';


export class FetchProducts implements Action {
  readonly type = FETCH_PRODUCTS;

  constructor(public payload: { page: number, sort: string, category: string }) {
  }
}

export class FetchProductsSuccess implements Action {
  readonly type = FETCH_PRODUCTS_SUCCESS;

  constructor(public payload: { res: IProducts[], selectedPage: number, selectedSort: string, selectedCategory: string }) {
  }
}

export class SearchProducts implements Action {
  readonly type = SEARCH_PRODUCTS;

  constructor(public payload: { keyword: string }) {
  }
}

export class SearchProductsSuccess implements Action {
  readonly type = SEARCH_PRODUCTS_SUCCESS;

  constructor(public payload: IProducts[]) {
  }
}

export class SearchProductsPaging implements Action {
  readonly type = SEARCH_PRODUCTS_PAGING;

  constructor(public payload: { page: number, keyword: string }) {
  }
}

export class SearchProductsPagingSuccess implements Action {
  readonly type = SEARCH_PRODUCTS_PAGING_SUCCESS;

  constructor(public payload: IProducts[]) {
  }
}

export class FetchProductsAppend implements Action {
  readonly type = FETCH_PRODUCTS_APPEND;

  constructor(public payload: { page: number, sort: string, category: string }) {
  }
}

export class FetchProductAppendSuccess implements Action {
  readonly type = FETCH_PRODUCTS_APPEND_SUCCESS;

  constructor(public payload: { res: IProducts[], selectedPage: number, selectedSort: string, selectedCategory: string }) {
  }
}

export class FetchCategory implements Action {
  readonly type = FETCH_CATEGORY;
}

export class FetchCategorySuccess implements Action {
  readonly type = FETCH_CATEGORY_SUCCESS;

  constructor(public payload: Category[]) {
  }
}

export class BrowseError implements Action {
  readonly type = BROWSE_ERROR;

  constructor(public payload: HttpError) {
  }
}


export type BrowseActions =
  FetchProducts
  | FetchProductsSuccess
  | SearchProducts
  | SearchProductsSuccess
  | SearchProductsPaging
  | SearchProductsPagingSuccess
  | FetchProductsAppend
  | FetchProductAppendSuccess
  | FetchCategory
  | FetchCategorySuccess
  | BrowseError;
