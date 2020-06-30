import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, filter, mergeMap } from 'rxjs/operators';
import { ICustomers } from '@eps/models';
import { CustomerActions } from '../actions';
import { CustomersService } from '@eps/services';

@Injectable()
export class CustomerEffects {
  fetchCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.fetchCustomer),
      mergeMap(({ id }) =>
        this.customersService.query({ 'peopleId.equals': id }).pipe(
          filter((res: HttpResponse<ICustomers[]>) => res.ok),
          map((res: HttpResponse<ICustomers[]>) => CustomerActions.fetchCustomerSuccess({ customer: res.body[0] })),
          catchError(err => of(CustomerActions.customerError({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private customersService: CustomersService) {}
}
