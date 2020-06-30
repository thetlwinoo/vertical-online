import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { ProductDetailsActions } from '../actions';
import { ProductsService } from '@eps/services';

@Injectable()
export class ProductDetailsEffects {
  fetchProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailsActions.fetchProductDetails),
      switchMap(({ id }) =>
        this.productsService.getProductDetails(id).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => ProductDetailsActions.fetcProductDetailsSuccess({ productDetails: res.body })),
          catchError(error => of(ProductDetailsActions.productDetailsError({ errorMsg: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, protected parseLinks: JhiParseLinks) {}
}
