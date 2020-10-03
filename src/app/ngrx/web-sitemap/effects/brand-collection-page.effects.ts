import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { BrandCollectionPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class BrandCollectionPageEffects {
  fetchBrandCollectionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandCollectionPageActions.fetchBrandCollectionPage),
      switchMap(() =>
        this.webSitemapService.getBrandCollectionPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => BrandCollectionPageActions.fetchBrandCollectionPageSuccess({ payload: res.body })),
          catchError(err => of(BrandCollectionPageActions.brandCollectionPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
