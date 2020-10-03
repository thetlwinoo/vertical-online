import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import { IAddresses, IAddressTypes } from '@vertical/models';
import { AddressActions } from '../actions';
import { CustomerActions } from 'app/ngrx/auth/actions';
import { AddressesService, AddressTypesService } from '@vertical/services';

@Injectable()
export class AddressEffects {
  fetchAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.fetchAddresses),
      switchMap(({ query }) =>
        this.addressesService.query(query).pipe(
          filter((res: HttpResponse<IAddresses[]>) => res.ok),
          map((res: HttpResponse<IAddresses[]>) => AddressActions.fetchAddressesSuccess({ addresses: res.body })),
          // tap(payload => {
          //   if (payload.addresses.length <= 0) {
          //     this.router.navigate(['pages/dashboard/address-book/new/']);
          //   }
          // }),
          catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
        )
      )
    )
  );

  createAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.createAddress),
      mergeMap(({ address, isShipping }) =>
        this.addressesService.createExtend(address, isShipping).pipe(
          filter((res: HttpResponse<IAddresses>) => res.ok),
          switchMap((res: HttpResponse<IAddresses>) => [
            AddressActions.createAddressSuccess({ address: res.body }),
            AddressActions.fetchAddresses({ query: { 'customerId.equals': res.body.customerId } }),
            CustomerActions.fetchCustomer({ query: { 'id.equals': res.body.customerId } }),
          ]),
          catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
        )
      )
    )
  );

  updateAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.updateAddress),
      mergeMap(({ address, isShipping }) =>
        this.addressesService.updateExtend(address, isShipping).pipe(
          filter((res: HttpResponse<IAddresses>) => res.ok),
          switchMap((res: HttpResponse<IAddresses>) => [
            AddressActions.updateAddressSuccess({ address: res.body }),
            AddressActions.fetchAddresses({ query: { 'customerId.equals': res.body.customerId } }),
          ]),
          catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
        )
      )
    )
  );

  removeAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.removeAddress),
      mergeMap(({ address }) =>
        this.addressesService.delete(address.id).pipe(
          filter((res: HttpResponse<IAddresses>) => res.ok),
          switchMap((res: HttpResponse<IAddresses>) => [
            AddressActions.removeAddressSuccess({ address: res.body }),
            AddressActions.fetchAddresses({ query: { 'customerId.equals': res.body.customerId } }),
          ]),
          catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
        )
      )
    )
  );

  // setDefault$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AddressActions.setDefault),
  //     mergeMap(({ props }) =>
  //       this.addressesService.setDefault(props).pipe(
  //         filter((res: HttpResponse<IAddresses>) => res.ok),
  //         switchMap((res: HttpResponse<IAddresses>) => [
  //           AddressActions.setDefaultSuccess({ address: res.body }),
  //           AddressActions.fetchAddresses({ query: { 'customerId.equals': res.body.customerId } }),
  //           CustomerActions.fetchCustomer({ query: { 'customerId.equals': res.body.customerId } }),
  //         ]),
  //         catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private router: Router,
    private addressesService: AddressesService,
    private addressTypesService: AddressTypesService
  ) {}
}
