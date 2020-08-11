import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, filter, mergeMap } from 'rxjs/operators';
import { ICustomers } from '@eps/models';
import { CustomerActions, PeopleActions } from '../actions';
import { CustomersService } from '@eps/services';
import { OrderActions } from 'app/ngrx/checkout/actions';

@Injectable()
export class CustomerEffects {
  fetchCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.fetchCustomer),
      mergeMap(({ query }) =>
        this.customersService.query(query).pipe(
          filter((res: HttpResponse<ICustomers[]>) => res.ok),
          mergeMap((res: HttpResponse<ICustomers[]>) => [
            CustomerActions.fetchCustomerSuccess({ customer: res.body[0] }),
            OrderActions.fetchTrackOrder({ query: { 'customerId.equals': res.body[0].id, page: 0, size: 3 } }),
          ]),
          catchError(err => of(CustomerActions.customerError({ errorMsg: err.message })))
        )
      )
    )
  );

  createCustomerAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.createCustomerAccount),
      mergeMap(() =>
        this.customersService.createCustomersAccount().pipe(
          filter((res: HttpResponse<ICustomers>) => res.ok),
          mergeMap((res: HttpResponse<ICustomers>) => [
            CustomerActions.createCustomerAccountSuccess({ customer: res.body }),
            PeopleActions.fetchLoginPeople({ query: { 'id.equals': res.body.peopleId } }),
          ]),
          catchError(err => of(CustomerActions.customerError({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private customersService: CustomersService) {}
}
