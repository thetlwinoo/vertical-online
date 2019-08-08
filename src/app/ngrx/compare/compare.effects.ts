import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import * as CompareActions from "./compare.actions";
import { of } from "rxjs";
import { CompareService } from "app/core/e-commerce/_services";

@Injectable()
export class CompareEffects {
    @Effect()
    fetchCompare = this.actions$.pipe(
        ofType(CompareActions.FETCH_COMPARE),
        switchMap((action: CompareActions.FetchCompare) => {
            return this.compareService.fetchCompare()
                .map(res => {
                    return { type: CompareActions.FETCH_COMPARE_SUCCESS, payload: { compare: res, effect: CompareActions.FETCH_COMPARE } }
                })
                .catch(error => {
                    return of(
                        new CompareActions.CompareError(
                            { error: error, errorEffect: CompareActions.FETCH_COMPARE }));
                })
        })
    )

    @Effect()
    checkInCompare = this.actions$.pipe(
        ofType(CompareActions.CHECK_IN_COMPARE),
        map((action: CompareActions.AddToCompare) => {
            return action.payload
        }),
        switchMap((payload) => {
            return this.compareService.isInCompare(payload)
                .map(res => {
                    return { type: CompareActions.CHECK_IN_COMPARE_SUCCESS, payload: { isInCompare: res, effect: CompareActions.CHECK_IN_COMPARE } }
                })
                .catch(error => {
                    return of(
                        new CompareActions.CompareError(
                            { error: error, errorEffect: CompareActions.CHECK_IN_COMPARE }));
                })
        })
    )

    @Effect()
    addToCompare = this.actions$.pipe(
        ofType(CompareActions.ADD_TO_COMPARE),
        map((action: CompareActions.AddToCompare) => {
            return action.payload
        }),
        switchMap((payload) => {
            return this.compareService.addToCompare(payload)
                .map(res => {
                    // this.router.navigate(["/checkout"]);
                    return { type: CompareActions.SET_COMPARE, payload: { compare: res, effect: CompareActions.ADD_TO_COMPARE } }
                }).catch(error => {
                    console.log('add to compare error', error);
                    return of(
                        new CompareActions.CompareError(
                            { error: error, errorEffect: CompareActions.ADD_TO_COMPARE }));
                })
        })
    )

    @Effect()
    removeFromCompare = this.actions$.pipe(
        ofType(CompareActions.REMOVE_FROM_COMPARE),
        map((action: CompareActions.RemoveFromCompare) => {
            return action.payload
        }),
        switchMap((id: number) => {
            return this.compareService.removeFromCompare(id)
                .map(res => ({ type: CompareActions.SET_COMPARE, payload: { compare: res, effect: CompareActions.REMOVE_FROM_COMPARE } }))
                .catch(error => {
                    return of(
                        new CompareActions.CompareError(
                            { error: error, errorEffect: CompareActions.REMOVE_FROM_COMPARE }));
                })
        })
    )

    @Effect()
    emptyCompare = this.actions$.pipe(
        ofType(CompareActions.EMPTY_COMPARE),
        switchMap((action: CompareActions.EmptyCompare) => {
            return this.compareService.emptyCompare()
                .map(res => {
                    return { type: CompareActions.EMPTY_COMPARE_SUCCESS, payload: res }
                }).catch(error => {
                    return of(
                        new CompareActions.CompareError({ error: error, errorEffect: CompareActions.EMPTY_COMPARE })
                    )
                })
        })
    )


    constructor(private actions$: Actions, private compareService: CompareService, private router: Router) {
    }
}
