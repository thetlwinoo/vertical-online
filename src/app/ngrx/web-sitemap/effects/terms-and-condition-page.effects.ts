import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { TermsAndConditionPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class TermsAndConditionPageEffects {
  fetchTermsAndConditionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TermsAndConditionPageActions.fetchTermsAndConditionPage),
      switchMap(() =>
        this.webSitemapService.getTermsAndConditionPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => TermsAndConditionPageActions.fetchTermsAndConditionPageSuccess({ payload: res.body })),
          catchError(err => of(TermsAndConditionPageActions.termsAndConditionPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
