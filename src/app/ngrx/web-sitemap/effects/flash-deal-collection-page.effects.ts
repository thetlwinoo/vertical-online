import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { FlashDealCollectionPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class FlashDealCollectionPageEffects {
  fetchFlashDealCollectionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlashDealCollectionPageActions.fetchFlashDealCollectionPage),
      switchMap(() =>
        this.webSitemapService.getFlashDealCollectionPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => FlashDealCollectionPageActions.fetchFlashDealCollectionPageSuccess({ payload: res.body })),
          catchError(err => of(FlashDealCollectionPageActions.flashDealCollectionPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
