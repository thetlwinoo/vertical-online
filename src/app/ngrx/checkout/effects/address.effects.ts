import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap } from 'rxjs/operators';
import { IAddresses } from '@root/models';
import { AddressActions } from '../actions';
import { AddressesService } from '@root/services';

@Injectable()
export class ProductEffects {
    fetchAddresses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddressActions.fetchAddresses),
            switchMap(() =>
                this.addressesService.fetch().pipe(
                    filter((res: HttpResponse<IAddresses[]>) => res.ok),
                    map((res: HttpResponse<IAddresses[]>) =>
                        AddressActions.fetchAddressesSuccess({ addresses: res.body })
                    ),
                    catchError(err =>
                        of(AddressActions.addressError({ errorMsg: err.message }))
                    )
                )
            )
        )
    );

    createAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddressActions.createAddress),
            mergeMap(({ address }) =>
                this.addressesService.create(address).pipe(
                    filter((res: HttpResponse<IAddresses>) => res.ok),
                    map((res: HttpResponse<IAddresses>) => AddressActions.createAddressSuccess({ address: res.body })),
                    catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
                )
            )
        )
    );

    updateAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddressActions.updateAddress),
            mergeMap(({ address }) =>
                this.addressesService.update(address).pipe(
                    filter((res: HttpResponse<IAddresses>) => res.ok),
                    switchMap((res: HttpResponse<IAddresses>) => [AddressActions.updateAddressSuccess({ address: res.body }), AddressActions.fetchAddresses]),
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
                    switchMap((res: HttpResponse<IAddresses>) => [AddressActions.removeAddressSuccess({ address: res.body }), AddressActions.fetchAddresses]),
                    catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
                )
            )
        )
    );

    setDefault$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddressActions.setDefault),
            mergeMap(({ id }) =>
                this.addressesService.setDefault(id).pipe(
                    filter((res: HttpResponse<IAddresses>) => res.ok),
                    switchMap((res: HttpResponse<IAddresses>) => [AddressActions.setDefaultSuccess({ address: res.body }), AddressActions.fetchAddresses]),
                    catchError(err => of(AddressActions.addressError({ errorMsg: err.message })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private addressesService: AddressesService
    ) { }
}