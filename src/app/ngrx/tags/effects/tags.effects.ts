import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { IProductTags } from '@root/models';
import { TagsActions } from '../actions';
import { ProductTagsService } from '@root/services';

@Injectable()
export class TagsEffects {
    search$ = createEffect(
        () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>

            this.actions$.pipe(
                ofType(TagsActions.search),
                debounceTime(debounce, scheduler),
                switchMap(({ query }) => {

                    if (query === '') {
                        return empty;
                    }

                    const nextSearch$ = this.actions$.pipe(
                        ofType(TagsActions.search),
                        skip(1)
                    );

                    return this.productTagsService.query({
                        'tagName.contains': query
                    }).pipe(
                        takeUntil(nextSearch$),
                        filter((res: HttpResponse<IProductTags[]>) => res.ok),
                        map((res: HttpResponse<IProductTags[]>) => TagsActions.searchSuccess({ tags: res.body })),
                        catchError(err =>
                            of(TagsActions.searchFailure({ errorMsg: err.message }))
                        )
                    );
                })
            )
    )

    constructor(
        private actions$: Actions,
        private productTagsService: ProductTagsService,
        protected parseLinks: JhiParseLinks
    ) { }
}