import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, filter, mergeMap } from 'rxjs/operators';
import { IPeople } from '@eps/models';
import { PeopleActions, CustomerActions } from '../actions';
import { PeopleService } from '@eps/services';

@Injectable()
export class PeopleEffects {
  fetchLoginPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeopleActions.fetchLoginPeople),
      mergeMap(({ query }) =>
        this.peopleService.query(query).pipe(
          filter((res: HttpResponse<IPeople[]>) => res.ok),
          mergeMap((res: HttpResponse<IPeople[]>) => [
            PeopleActions.fetchLoginPeopleSuccess({ people: res.body[0] }),
            CustomerActions.fetchCustomer({ query: { 'peopleId.equals': res.body[0].id } }),
          ]),
          catchError(err => of(PeopleActions.peopleError({ errorMsg: err.message })))
        )
      )
    )
  );

  saveProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeopleActions.saveProfile),
      mergeMap(({ people }) =>
        this.peopleService.update(people).pipe(
          map(() => PeopleActions.saveProfileSuccess({ people })),
          catchError(err => of(PeopleActions.peopleError({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private peopleService: PeopleService) {}
}
