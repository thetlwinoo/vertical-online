import * as ReviewsActions from "./reviews.actions";
import { HttpError } from "../app.reducers";
import { ReviewLines } from "app/core/e-commerce/_models";


export interface State {
    reviewLines: ReviewLines[];
    data: any;
    canFetch: boolean;
    errors: HttpError[];
    loading: boolean;
}

const initialState: State = {
    reviewLines: [],
    data: {},
    canFetch: true,
    errors: [],
    loading: false
};

export function reviewReducer(state = initialState, action: ReviewsActions.ReviewActions) {
    switch (action.type) {
        case (ReviewsActions.FETCH_REVIEWS):
            return {
                ...state,
                loading: true
            };

        case (ReviewsActions.FETCH_REVIEWS_SUCCESS):
            let fetchReviewsErrorClear = state.errors;
            for (let i = 0; i < fetchReviewsErrorClear.length; i++) {
                if (fetchReviewsErrorClear[i].errorEffect === 'FETCH_REVIEWS') {
                    fetchReviewsErrorClear = fetchReviewsErrorClear.splice(i, 1);
                }
            }

            if (action.payload.length == 0) {
                return {
                    ...state,
                    canFetch: false,
                    errors: fetchReviewsErrorClear,
                    loading: false
                }
            }
            let allRating = 0, count = 0;
            let ratingObject = {
                fiveStars: 0,
                fourStars: 0,
                threeStars: 0,
                twoStars: 0,
                oneStar: 0,
                overAllRating: 0,
                ratingCount: 0,
            };

            action.payload.map(data => {
                allRating += data.productRating;
                count += 1;
                switch (data.productRating) {
                    case 5:
                        ratingObject.fiveStars += 1; break;
                    case 4:
                        ratingObject.fourStars += 1; break;
                    case 3:
                        ratingObject.threeStars += 1; break;
                    case 2:
                        ratingObject.twoStars += 1; break;
                    case 1:
                        ratingObject.oneStar += 1; break;
                    default: break;
                }
            });
            ratingObject.overAllRating = Math.ceil(allRating / count);
            ratingObject.ratingCount = count;

            return {
                ...state,
                reviewLines: action.payload,
                data: ratingObject,
                canFetch: true,
                errors: fetchReviewsErrorClear,
                loading: false
            };

        case (ReviewsActions.REVIEWS_ERROR):
            let reviewErrorPush = state.errors;
            for (let i = 0; i < reviewErrorPush.length; i++) {
                if (reviewErrorPush[i].errorEffect === action.payload.errorEffect) {
                    reviewErrorPush[i] = action.payload;
                    return {
                        ...state,
                        errors: reviewErrorPush,
                        loading: false
                    };
                }
            }
            reviewErrorPush.push(action.payload);
            return {
                ...state,
                errors: reviewErrorPush,
                loading: false
            };

        default:
            return state;
    }
}
