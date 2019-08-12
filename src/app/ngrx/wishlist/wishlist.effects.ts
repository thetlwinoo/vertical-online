import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import * as WishlistActions from "./wishlist.actions";
import { of } from "rxjs";
import { WishlistService } from "@root/services";

@Injectable()
export class WishlistEffects {
    @Effect()
    fetchWishlist = this.actions$.pipe(
        ofType(WishlistActions.FETCH_WISHLIST),
        switchMap((action: WishlistActions.FetchWishlist) => {
            return this.wishlistService.fetchWishlist()
                .map(res => {
                    return { type: WishlistActions.FETCH_WISHLIST_SUCCESS, payload: { wishlist: res, effect: WishlistActions.FETCH_WISHLIST } }
                })
                .catch(error => {
                    return of(
                        new WishlistActions.WishlistError(
                            { error: error, errorEffect: WishlistActions.FETCH_WISHLIST }));
                })
        })
    )

    @Effect()
    checkInWishlist = this.actions$.pipe(
        ofType(WishlistActions.CHECK_IN_WISHLIST),
        map((action: WishlistActions.AddToWishlist) => {
            return action.payload
        }),
        switchMap((payload) => {
            return this.wishlistService.isInWishlist(payload)
                .map(res => {
                    return { type: WishlistActions.CHECK_IN_WISHLIST_SUCCESS, payload: { isInWishlist: res, effect: WishlistActions.CHECK_IN_WISHLIST } }
                })
                .catch(error => {
                    return of(
                        new WishlistActions.WishlistError(
                            { error: error, errorEffect: WishlistActions.CHECK_IN_WISHLIST }));
                })
        })
    )

    @Effect()
    addToWishlist = this.actions$.pipe(
        ofType(WishlistActions.ADD_TO_WISHLIST),
        map((action: WishlistActions.AddToWishlist) => {
            return action.payload
        }),
        switchMap((payload) => {
            return this.wishlistService.addToWishlist(payload)
                .map(res => {
                    // this.router.navigate(["/checkout"]);
                    return { type: WishlistActions.SET_WISHLIST, payload: { wishlist: res, effect: WishlistActions.ADD_TO_WISHLIST } }
                }).catch(error => {
                    console.log('add to wishlist error', error);
                    return of(
                        new WishlistActions.WishlistError(
                            { error: error, errorEffect: WishlistActions.ADD_TO_WISHLIST }));
                })
        })
    )

    @Effect()
    removeFromWishlist = this.actions$.pipe(
        ofType(WishlistActions.REMOVE_FROM_WISHLIST),
        map((action: WishlistActions.RemoveFromWishlist) => {
            return action.payload
        }),
        switchMap((id: number) => {
            return this.wishlistService.removeFromWishlist(id)
                .map(res => ({ type: WishlistActions.SET_WISHLIST, payload: { wishlist: res, effect: WishlistActions.REMOVE_FROM_WISHLIST } }))
                .catch(error => {
                    return of(
                        new WishlistActions.WishlistError(
                            { error: error, errorEffect: WishlistActions.REMOVE_FROM_WISHLIST }));
                })
        })
    )

    @Effect()
    emptyWishlist = this.actions$.pipe(
        ofType(WishlistActions.EMPTY_WISHLIST),
        switchMap((action: WishlistActions.EmptyWishlist) => {
            return this.wishlistService.emptyWishlist()
                .map(res => {
                    return { type: WishlistActions.EMPTY_WISHLIST_SUCCESS, payload: res }
                }).catch(error => {
                    return of(
                        new WishlistActions.WishlistError({ error: error, errorEffect: WishlistActions.EMPTY_WISHLIST })
                    )
                })
        })
    )

    constructor(private actions$: Actions, private wishlistService: WishlistService, private router: Router) {
    }
}
