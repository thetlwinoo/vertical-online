import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponentsModule } from './components/components.module';

import { ProductService } from "./e-commerce/_services/product.service";
import { CartService } from "./e-commerce/_services/cart.service";
import { OrderService } from "./e-commerce/_services/order.service";
import { PeopleService } from "./e-commerce/_services/people.service";
import { TokenService } from "./e-commerce/_services/token.service";
import { PaypalService } from "./e-commerce/_services/paypal.service";
import { CreditCardService } from "./e-commerce/_services/credit-card.service";
import { AuthGuardService } from "./e-commerce/_services/auth-guard.service";
import { NonAuthGuardService } from "./e-commerce/_services/non-auth-guard.service";
import { AccountService } from "./e-commerce/_services/account.service";
import { ProductPhotoService } from './e-commerce/_services/product-photo.service';
import { WishlistService } from './e-commerce/_services/wishlist.service';
import { CompareService } from './e-commerce/_services/compare.service';
import { ReviewsService } from './e-commerce/_services/reviews.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreComponentsModule
  ],
  exports: [
    CoreComponentsModule
  ],
  providers: [
    ProductService,
    CartService,
    OrderService,
    PeopleService,
    TokenService,
    PaypalService,
    CreditCardService,
    AuthGuardService,
    NonAuthGuardService,
    AccountService,
    ProductPhotoService,
    WishlistService,
    CompareService,
    ReviewsService
  ]
})
export class CoreModule { }
