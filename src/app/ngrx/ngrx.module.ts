import { NgModule } from '@angular/core';
import { reducers } from "./app.reducers";
//Store Module
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";

//Effects
import { CartEffects } from "./cart/cart.effects";
import { OrderEffects } from "./order/order.effects";
import { AuthEffects } from "./auth/auth.effects";
import { ShowcaseEffects } from "./showcase/showcase.effects";
import { BrowseEffects } from "./browse/browse.effects";
import { PeopleEffects } from "./people/people.effects";
import { PaymentEffects } from "./payment/payment.effects";
import { PhotoEffects } from "./photo/photo.effects";
import { WishlistEffects } from "./wishlist/wishlist.effects";
import { CompareEffects } from "./compare/compare.effects";
import { AddressesEffects } from "./adresses/addresses.effects";
import { ReviewsEffects } from "./reviews/reviews.effects";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    EffectsModule.forRoot([
      CartEffects,
      OrderEffects,
      AuthEffects,
      ShowcaseEffects,
      BrowseEffects,
      PeopleEffects,
      AddressesEffects,
      PaymentEffects,
      PhotoEffects,
      WishlistEffects,
      CompareEffects,
      ReviewsEffects
    ])
  ]
})
export class NgrxModule { }
