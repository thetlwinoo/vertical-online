import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { CashBackPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class CashBackPageEffects {
  fetchCashBackPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBackPageActions.fetchCashBackPage),
      switchMap(() =>
        this.webSitemapService.getCashBackPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => CashBackPageActions.fetchCashBackPageSuccess({ payload: res.body })),
          catchError(err => of(CashBackPageActions.cashBackPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
