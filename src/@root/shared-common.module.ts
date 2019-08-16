import { NgModule } from '@angular/core';
import { ResourceSharedLibsModule } from './shared-libs.module';

import {
    CartService,
    OrderService,
    PeopleService,
    TokenService,
    PaypalService,
    CreditCardService,
    // AuthGuardService,
    // NonAuthGuardService,
    AccountApiService,
    ProductPhotoService,
    WishlistService,
    CompareService,
    ReviewsService,
    BreadcrumbGuard
} from "@root/services";


@NgModule({
    imports: [
        ResourceSharedLibsModule,
    ],
    declarations: [
    ],
    exports: [
        ResourceSharedLibsModule
    ],
    providers: [
        CartService,
        OrderService,
        PeopleService,
        TokenService,
        PaypalService,
        CreditCardService,
        // AuthGuardService,
        // NonAuthGuardService,
        AccountApiService,
        ProductPhotoService,
        WishlistService,
        CompareService,
        ReviewsService,
        BreadcrumbGuard
    ]
})
export class ResourceSharedCommonModule { }
