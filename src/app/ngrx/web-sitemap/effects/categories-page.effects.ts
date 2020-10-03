import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { CategoriesPageActions } from '../actions';
import { WebSitemapService } from '@vertical/services';

@Injectable()
export class CategoriesPageEffects {
  fetchCategoriesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesPageActions.fetchCategoriesPage),
      switchMap(({ categoryId }) =>
        this.webSitemapService.getCategoriesPage(categoryId).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          map((res: HttpResponse<any>) => CategoriesPageActions.fetchCategoriesPageSuccess({ payload: res.body })),
          catchError(err => of(CategoriesPageActions.categoriesPageFailure({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private webSitemapService: WebSitemapService, protected parseLinks: JhiParseLinks) {}
}
