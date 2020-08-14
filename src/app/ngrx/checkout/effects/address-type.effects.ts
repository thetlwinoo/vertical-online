import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { IAddressTypes } from '@vertical/models';
import { AddressTypeActions } from '../actions';
import { AddressTypesService } from '@vertical/services';

@Injectable()
export class AddressTypeEffects {
  fetchAddressTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressTypeActions.fetchAddressTypes),
      switchMap(() =>
        this.addressTypesService.query().pipe(
          filter((res: HttpResponse<IAddressTypes[]>) => res.ok),
          map((res: HttpResponse<IAddressTypes[]>) => AddressTypeActions.fetchAddressTypesSuccess({ addressTypes: res.body })),
          catchError(err => of(AddressTypeActions.addressTypeError({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private router: Router, private addressTypesService: AddressTypesService) {}
}
