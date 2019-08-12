import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as AddressesActions from "./addresses.actions";
import { AddressesService } from "@root/services";
import { of } from "rxjs";
import { Addresses } from '@root/models';

@Injectable()
export class AddressesEffects {
    @Effect()
    fetchAddresses = this.actions$.pipe(
        ofType(AddressesActions.FETCH_ADDRESSES),
        switchMap(() => {
            return this.addressesService.fetch()
                .map(res => {
                    console.log('fetch success', res)
                    return {
                        type: AddressesActions.FETCH_ADDRESSES_SUCCESS,
                        payload: res.body
                    }
                }).catch(error => {
                    return of(
                        new AddressesActions.AddressesError(
                            { error: error, errorEffect: AddressesActions.FETCH_ADDRESSES }));
                })
        })
    )

    @Effect()
    crateAddresses = this.actions$.pipe(
        ofType(AddressesActions.CREATE_ADDRESSES),
        map((action: AddressesActions.CreateAddresses) => {
            return action.payload
        }),
        switchMap((data: any) => {
            console.log('CREATE_ADDRESSES EFFECT', data);

            return this.addressesService.create(data)
                .switchMap(res => {
                    console.log('create success', res)
                    return [
                        { type: AddressesActions.FETCH_ADDRESSES }]
                })
                .catch(error => {
                    return of(
                        new AddressesActions.AddressesError(
                            { error: error, errorEffect: AddressesActions.CREATE_ADDRESSES }));
                })
        })
    )

    @Effect()
    updateAddresses = this.actions$.pipe(
        ofType(AddressesActions.UPDATE_ADDRESSES),
        map((action: AddressesActions.UpdateAddresses) => {
            return action.payload
        }),
        switchMap((data: any) => {
            console.log('UPDATE_ADDRESSES EFFECT', data);

            return this.addressesService.update(data)
                .switchMap(res => {
                    return [
                        { type: AddressesActions.FETCH_ADDRESSES }]
                })
                .catch(error => {
                    return of(
                        new AddressesActions.AddressesError(
                            { error: error, errorEffect: AddressesActions.UPDATE_ADDRESSES }));
                })
        })
    )

    @Effect()
    removeAddress = this.actions$.pipe(
        ofType(AddressesActions.REMOVE_ADDRESSES),
        map((action: AddressesActions.RemoveAddresses) => {
            return action.payload
        }),
        switchMap((id: number) => {
            return this.addressesService.delete(id)
                .map(res => ({ type: AddressesActions.FETCH_ADDRESSES }))
                .catch(error => {
                    return of(
                        new AddressesActions.AddressesError(
                            { error: error, errorEffect: AddressesActions.REMOVE_ADDRESSES }));
                })
        })
    )

    @Effect()
    setDefault = this.actions$.pipe(
        ofType(AddressesActions.SET_DEFAULT),
        map((action: AddressesActions.SetDefault) => {
            return action.payload
        }),
        switchMap((id: number) => {
            return this.addressesService.setDefault(id)
                .map(res => ({ type: AddressesActions.FETCH_ADDRESSES }))
                .catch(error => {
                    return of(
                        new AddressesActions.AddressesError(
                            { error: error, errorEffect: AddressesActions.SET_DEFAULT }));
                })
        })
    )

    constructor(private actions$: Actions, private addressesService: AddressesService) {
    }
}