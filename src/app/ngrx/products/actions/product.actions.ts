import { createAction, props } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { IProducts, IStockItems } from '@eps/models';

export const loadProduct = createAction('[Product Exists Guard] Load Product', props<{ product: IProducts }>());

export const searchProductsWithNoPaging = createAction('[Find Product] Search Products With No Paging', props<{ keyword: string }>());

export const searchProductsWithPaging = createAction('[Find Product] Search Products With Paging', props<{ query: any }>());

export const selectProduct = createAction('[View Product] Select Product', props<{ id: number }>());

export const selectStockItem = createAction('[View StockItem] Select Stock Item', props<{ stockItem: IStockItems }>());

export const searchWithPagingSuccess = createAction('[Products/API] Search With Paging Success', props<{ payload: any }>());

export const searchWithNoPagingSuccess = createAction('[Products/API] Search With No Paging Success', props<{ products: IProducts[] }>());

export const searchFailure = createAction('[Products/API] Search Failure', props<{ errorMsg: string }>());
