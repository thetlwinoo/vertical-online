import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { CollectVoucherPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class CollectVoucherPageEffects {
  fetchCollectVoucherPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectVoucherPageActions.fetchCollectVoucherPage),
      switchMap(() =>
        this.webSitemapService.getCollectVoucherPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => CollectVoucherPageActions.fetchCollectVoucherPageSuccess({ payload: res.body })),
          catchError(err => of(CollectVoucherPageActions.collectVoucherPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
