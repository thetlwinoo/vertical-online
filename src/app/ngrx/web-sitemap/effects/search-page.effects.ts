import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { SearchPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class SearchPageEffects {
  fetchSearchPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchPageActions.fetchSearchPage),
      switchMap(() =>
        this.webSitemapService.getSearchPage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => SearchPageActions.fetchSearchPageSuccess({ payload: res.body })),
          catchError(err => of(SearchPageActions.searchPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
