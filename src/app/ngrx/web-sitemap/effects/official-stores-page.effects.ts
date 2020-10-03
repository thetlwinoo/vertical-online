import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { OfficialStoresPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class OfficialStoresPageEffects {
  fetchOfficialStoresPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfficialStoresPageActions.fetchOfficialStoresPage),
      switchMap(() =>
        this.webSitemapService.getOfficialStoresPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => OfficialStoresPageActions.fetchOfficialStoresPageSuccess({ payload: res.body })),
          catchError(err => of(OfficialStoresPageActions.officialStoresPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
