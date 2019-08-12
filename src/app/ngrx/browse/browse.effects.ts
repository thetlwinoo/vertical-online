import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as BrowseActions from "./browse.actions";
import { ProductService } from "@root/services";
import { of } from "rxjs";

@Injectable()
export class BrowseEffects {
  @Effect()
  fetchProducts = this.actions$.pipe(
    ofType(BrowseActions.FETCH_PRODUCTS),
    map((action: BrowseActions.FetchProducts) => {
      return action.payload;
    }),
    switchMap((params: { page: number, sort: string, category: string }) => {
      return this.productService.getProducts(params.page, params.sort, params.category)
        .map(res => {
          console.log(res);
          return {
            type: BrowseActions.FETCH_PRODUCTS_SUCCESS,
            payload: {
              res: res,
              selectedPage: ++params.page,
              selectedSort: params.sort,
              selectedCategory: params.category
            }
          }
        }).catch(error => {
          return of(
            new BrowseActions.BrowseError(
              { error: error, errorEffect: BrowseActions.FETCH_PRODUCTS }));
        })
    })
  )

  @Effect()
  fetchProductsAppend = this.actions$.pipe(
    ofType(BrowseActions.FETCH_PRODUCTS_APPEND),
    map((action: BrowseActions.FetchProducts) => {
      return action.payload;
    }),
    mergeMap((params: { page: number, sort: string, category: string }) => {
      return this.productService.getProducts(params.page, params.sort, params.category)
        .map(res => {
          return {
            type: BrowseActions.FETCH_PRODUCTS_APPEND_SUCCESS,
            payload: {
              res: res,
              selectedPage: ++params.page,
              selectedSort: params.sort,
              selectedCategory: params.category
            }
          }
        }).catch(error => {
          return of(
            new BrowseActions.BrowseError(
              { error: error, errorEffect: BrowseActions.FETCH_PRODUCTS_APPEND }));
        })
    })
  )

  @Effect()
  fetchCategory = this.actions$.pipe(
    ofType(BrowseActions.FETCH_CATEGORY),
    switchMap((action: BrowseActions.FetchCategory) => {
      return this.productService.getCategory()
        .map(res => {
          return { type: BrowseActions.FETCH_CATEGORY_SUCCESS, payload: res }
        }).catch(error => {
          return of(
            new BrowseActions.BrowseError(
              { error: error, errorEffect: BrowseActions.FETCH_CATEGORY }));
        })
    })
  )


  constructor(private actions$: Actions, private productService: ProductService) {
  }
}
