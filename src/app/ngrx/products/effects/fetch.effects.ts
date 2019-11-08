import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter } from 'rxjs/operators';
import { IProducts, IReviewLines, IProductPhoto, IProductCategory, IProductSubCategory } from '@epm/models';
import { FetchActions } from '../actions';
import { ProductsService, ReviewsService, ProductPhotoService, ProductCategoryService } from '@epm/services';

@Injectable()
export class FetchEffects {
    fetchNewlyAdded$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchNewlyAdded),
            switchMap(() =>
                this.productsService.getNewlyAdded().pipe(
                    filter((res: HttpResponse<IProducts[]>) => res.ok),
                    map((res: HttpResponse<IProducts[]>) =>
                        FetchActions.fetchNewlyAddedSuccess({ newlyAdded: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
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
                    map((res: HttpResponse<IProducts[]>) =>
                        FetchActions.fetchMostSellingSuccess({ mostSelling: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
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
                    map((res: HttpResponse<IProducts[]>) =>
                        FetchActions.fetchInterestedSuccess({ interested: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
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
                    map((res: HttpResponse<IProducts[]>) =>
                        FetchActions.fetchDailyDiscoverSuccess({ dailyDiscover: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
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
                    map((res: HttpResponse<IProducts[]>) =>
                        FetchActions.fetchRelatedSuccess({ related: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    fetchReviewLines$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchReviewLines),
            switchMap(({ id }) =>
                this.reviewsService.getReviewLinesByProductId(id).pipe(
                    filter((res: HttpResponse<IReviewLines[]>) => res.ok),
                    map((res: HttpResponse<IReviewLines[]>) =>
                        FetchActions.fetchReviewLinesSuccess({ reviewLines: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    fetchProductPhoto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchProductPhoto),
            switchMap(({ id }) =>
                this.productPhotoService.getProductPhotos(id).pipe(
                    filter((res: HttpResponse<IProductPhoto[]>) => res.ok),
                    map((res: HttpResponse<IProductPhoto[]>) =>
                        FetchActions.fetchProductPhotoSuccess({ photos: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    fetchCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchCategories),
            switchMap(() =>
                this.productCategoryService.query().pipe(
                    filter((res: HttpResponse<IProductCategory[]>) => res.ok),
                    map((res: HttpResponse<IProductCategory[]>) =>
                        FetchActions.fetchCategoriesSuccess({ categories: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    fetchSubCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchActions.fetchSubCategories),
            switchMap(() =>
                this.productCategoryService.query().pipe(
                    filter((res: HttpResponse<IProductSubCategory[]>) => res.ok),
                    map((res: HttpResponse<IProductSubCategory[]>) =>
                        FetchActions.fetchSubCategoriesSuccess({ subCategories: res.body })
                    ),
                    catchError(err =>
                        of(FetchActions.fetchFailure({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private productCategoryService: ProductCategoryService,
        private productPhotoService: ProductPhotoService,
        private reviewsService: ReviewsService
    ) { }
}
