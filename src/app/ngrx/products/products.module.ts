import { RootSharedModule } from '@root/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from 'app/ngrx/products/products-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductEffects, CompareEffects, WishlistEffects, FetchEffects } from 'app/ngrx/products/effects';
import * as fromProducts from 'app/ngrx/products/reducers';
import { ViewProductPageComponent } from './containers/view-product-page/view-product-page.component';
import { SelectedProductPageComponent } from './containers/selected-product-page/selected-product-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';

export const COMPONENTS = [
    ProductDetailComponent,
    ReviewProductComponent, 
    RelatedProductComponent,
    ProductGalleryComponent
];

export const CONTAINERS = [
    SelectedProductPageComponent,
    ViewProductPageComponent
];

@NgModule({
    imports: [        
        RootSharedModule,
        PartialsModule,
        ProductsRoutingModule,        
        StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.reducers),

        EffectsModule.forFeature([ProductEffects, FetchEffects, CompareEffects, WishlistEffects]),
        CarouselModule
    ],
    declarations: [COMPONENTS, CONTAINERS],
})
export class ProductsModule { }