import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { HomePageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class HomePageEffects {
  fetchHomePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.fetchHomePage),
      switchMap(() =>
        this.webSitemapService.getHomePage().pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => HomePageActions.fetchHomePageSuccess({ payload: res.body })),
          catchError(err => of(HomePageActions.homePageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
