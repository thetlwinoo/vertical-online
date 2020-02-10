import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, filter, mergeMap } from 'rxjs/operators';
import { IPeople } from '@eps/models';
import { PeopleActions } from '../actions';
import { PeopleService } from '@eps/services';

@Injectable()
export class PeopleEffects {
    fetchLoginPeople$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleActions.fetchLoginPeople),
            mergeMap(({ people }) =>
                this.peopleService.checkProfile(people).pipe(
                    filter((res: HttpResponse<IPeople>) => res.ok),
                    map((res: HttpResponse<IPeople>) => PeopleActions.fetchLoginPeopleSuccess({ people: res.body })),
                    catchError(err =>
                        of(PeopleActions.peopleError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private peopleService: PeopleService
    ) { }
}