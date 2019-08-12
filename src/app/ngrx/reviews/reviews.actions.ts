import { Action } from '@ngrx/store';
import { HttpError } from "../app.reducers";
import { ReviewLines } from "@root/models";
export const FETCH_REVIEWS = 'FETCH_REVIEWS';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const REVIEWS_ERROR = 'REVIEWS_ERROR';

export class FetchReviews implements Action {
    readonly type = FETCH_REVIEWS;

    constructor(public payload: number) {
    }
}

export class FetchReviewsSuccess implements Action {
    readonly type = FETCH_REVIEWS_SUCCESS;

    constructor(public payload: ReviewLines[]) {
    }
}

export class ReviewsError implements Action {
    readonly type = REVIEWS_ERROR;

    constructor(public payload: HttpError) {
    }
}

export type ReviewActions =
    FetchReviews
    | FetchReviewsSuccess
    | ReviewsError;