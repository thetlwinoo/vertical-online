import { ActionReducerMap } from '@ngrx/store';
import * as fromCart from '../ngrx/cart/cart.reducer';
import * as fromOrder from '../ngrx/order/order.reducer';
import * as fromAuth from '../ngrx/auth/auth.reducer';
import * as fromShowcase from '../ngrx/showcase/showcase.reducer';
import * as fromBrowse from '../ngrx/browse/browse.reducer';
import * as fromPeople from '../ngrx/people/people.reducer';
import * as fromAddress from './adresses/addresses.reducer';
import * as fromPayment from './payment/payment.reducer';
import * as fromPhotos from './photo/photo.reducer';
import * as fromWishlist from './wishlist/wishlist.reducer';
import * as fromCompare from './compare/compare.reducer';
import * as fromReviews from './reviews/reviews.reducer';
import { HttpErrorResponse } from "@angular/common/http";

export interface HttpError {
    error: HttpErrorResponse,
    errorEffect: string
}

export interface AppState {
    cart: fromCart.State,
    order: fromOrder.State,
    auth: fromAuth.State,
    showcase: fromShowcase.State,
    browse: fromBrowse.State,
    people: fromPeople.State,
    addresses: fromAddress.State,
    payment: fromPayment.State,
    photos: fromPhotos.State,
    wishlist: fromWishlist.State,
    compare: fromCompare.State,
    reviews: fromReviews.State
}

export const reducers: ActionReducerMap<AppState> = {
    cart: fromCart.cartReducer,
    order: fromOrder.orderReducer,
    auth: fromAuth.authReducer,
    showcase: fromShowcase.showcaseReducer,
    browse: fromBrowse.browseReducer,
    people: fromPeople.peopleReducer,
    addresses: fromAddress.addressReducer,
    payment: fromPayment.paymentReducer,
    photos: fromPhotos.photoReducer,
    wishlist: fromWishlist.wishlistReducer,
    compare: fromCompare.compareReducer,
    reviews: fromReviews.reviewReducer
};
