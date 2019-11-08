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
    BreadcrumbGuard,
    LayoutUtilsService
} from "@epm/services";
import { ConfirmationService } from 'primeng/api';

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
        LayoutUtilsService,
        // AuthGuardService,
        // NonAuthGuardService,
        AccountApiService,
        ProductPhotoService,
        WishlistService,
        CompareService,
        ReviewsService,
        ConfirmationService,
        BreadcrumbGuard
    ]
})
export class ResourceSharedCommonModule { }
