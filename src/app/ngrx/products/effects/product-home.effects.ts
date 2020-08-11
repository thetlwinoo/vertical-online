import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { ProductHomeActions } from '../actions';
import { ProductsService } from '@eps/services';

@Injectable()
export class ProductHomeEffects {
  fetchProductsHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductHomeActions.fetchProductsHome),
      switchMap(() =>
        this.productsService.getProductsHome().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => ProductHomeActions.fetchProductsHomeSuccess({ payload: res.body })),
          catchError(err => of(ProductHomeActions.productHomeFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productsService: ProductsService, protected parseLinks: JhiParseLinks) {}
}
