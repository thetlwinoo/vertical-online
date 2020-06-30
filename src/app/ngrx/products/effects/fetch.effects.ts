import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { IProducts, IProductCategory, IStockItems, IPhotos, IOrderLines } from '@eps/models';
import { FetchActions } from '../actions';
import {
  ProductsService,
  ProductCategoryService,
  StockItemsService,
  PhotosService,
  ProductDocumentService,
  OrderLinesService,
} from '@eps/services';
import { ProductDocument } from '@eps/models/product-document.model';

@Injectable()
export class FetchEffects {
  fetchNewlyAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchNewlyAdded),
      switchMap(() =>
        this.productsService.getNewlyAdded().pipe(
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });
            return FetchActions.fetchNewlyAddedSuccess({
              newlyAdded: res.body,
            });
          }),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchMostSelling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchMostSelling),
      switchMap(() =>
        this.productsService.getMostSelling().pipe(
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });
            return FetchActions.fetchMostSellingSuccess({ mostSelling: res.body });
          }),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchInterested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchInterested),
      switchMap(() =>
        this.productsService.getInterested().pipe(
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });
            return FetchActions.fetchInterestedSuccess({ interested: res.body });
          }),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchDailyDiscover$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchDailyDiscover),
      switchMap(() =>
        this.productsService.getDailyDiscover().pipe(
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });
            return FetchActions.fetchDailyDiscoverSuccess({ dailyDiscover: res.body });
          }),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchRelated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchRelated),
      switchMap(({ id }) =>
        this.productsService.getRelatedProducts(id).pipe(
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => {
            res.body.map(item => {
              item.productDetails = JSON.parse(item.productDetails);
            });
            return FetchActions.fetchRelatedSuccess({ products: res.body });
          }),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchReviewDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchReviewsDetails),
      switchMap(({ productId }) =>
        this.orderLinesService.getOrderLinesByProduct({ productId }).pipe(
          filter((res: HttpResponse<IOrderLines[]>) => res.ok),
          map((res: HttpResponse<IOrderLines[]>) => FetchActions.fetchReviewsDetailsSuccess({ reviewDetails: res.body })),
          catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchStockItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchStockItems),
      switchMap(({ productId }) =>
        this.stockItemsService
          .query({
            'productId.equals': productId,
          })
          .pipe(
            filter((res: HttpResponse<IStockItems[]>) => res.ok),
            map((res: HttpResponse<IStockItems[]>) => FetchActions.fetchStockItemsSuccess({ stockItems: res.body })),
            catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
          )
      )
    )
  );

  fetchProductDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchProductDocument),
      switchMap(({ productId }) =>
        this.productDocumentService
          .query({
            'productId.equals': productId,
          })
          .pipe(
            filter((res: HttpResponse<ProductDocument[]>) => res.ok),
            map((res: HttpResponse<ProductDocument[]>) => FetchActions.fetchProductDocumentSuccess({ productDocument: res.body[0] })),
            catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
          )
      )
    )
  );

  fetchPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchPhotos),
      switchMap(({ stockItemId }) =>
        this.photosService
          .query({
            'stockItemId.equals': stockItemId,
          })
          .pipe(
            filter((res: HttpResponse<IPhotos[]>) => res.ok),
            map((res: HttpResponse<IPhotos[]>) => FetchActions.fetchPhotosSuccess({ photos: res.body })),
            catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
          )
      )
    )
  );

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchCategories),
      switchMap(() =>
        this.productCategoryService
          .query({
            'justForYouInd.equals': true,
          })
          .pipe(
            filter((res: HttpResponse<IProductCategory[]>) => res.ok),
            map((res: HttpResponse<IProductCategory[]>) => FetchActions.fetchCategoriesSuccess({ categories: res.body })),
            catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
          )
      )
    )
  );

  fetchCategoriesTree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FetchActions.fetchCategoriesTree),
      switchMap(() =>
        this.productCategoryService
          .getCategoriesTree({
            shownav: true,
          })
          .pipe(
            filter((res: HttpResponse<IProductCategory[]>) => res.ok),
            map((res: HttpResponse<IProductCategory[]>) => FetchActions.fetchCategoriesTreeSuccess({ categoriesTree: res.body })),
            catchError(err => of(FetchActions.fetchFailure({ errorMsg: err.message })))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private productCategoryService: ProductCategoryService,
    private orderLinesService: OrderLinesService,
    private stockItemsService: StockItemsService,
    private productDocumentService: ProductDocumentService,
    private photosService: PhotosService
  ) {}
}
