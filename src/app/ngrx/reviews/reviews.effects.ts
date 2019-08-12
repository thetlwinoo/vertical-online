import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as ReviewsActions from "./reviews.actions";
import { ReviewsService } from "@root/services";
import { of } from "rxjs";

@Injectable()
export class ReviewsEffects {
    @Effect()
    fetchReviews = this.actions$.pipe(
        ofType(ReviewsActions.FETCH_REVIEWS),
        map((action: ReviewsActions.FetchReviews) => {
            return action.payload;
        }),
        switchMap(payload => {
            return this.reviewsService.getReviewLinesByProductId(payload)
                .map(res => {
                    console.log(res);
                    return {
                        type: ReviewsActions.FETCH_REVIEWS_SUCCESS,
                        payload: res.body
                    }
                }).catch(error => {
                    return of(
                        new ReviewsActions.ReviewsError(
                            { error: error, errorEffect: ReviewsActions.FETCH_REVIEWS }));
                })
        })
    )

    constructor(private actions$: Actions, private reviewsService: ReviewsService) {
    }
}