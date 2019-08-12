import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { FormsModule } from '@angular/forms';
import { RootSharedModule } from '@root/shared.module';
import { ReviewsProductComponent } from './reviews-product/reviews-product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BreadcrumbGuard } from '@root/services';

const routes: Routes = [
  {
    path: ':id',
    component: ProductDetailComponent,
    data: {
      crumbs: [{
        label: 'product'
      }, {
        label: 'details'
      }
      ]
    },
    canActivate: [
      BreadcrumbGuard
    ]
  }
];

@NgModule({
  declarations: [
    ProductDetailComponent,
    RelatedProductsComponent,
    ReviewsProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule,
    FormsModule,
    RootSharedModule
  ],
  providers: []
})
export class ProductsModule { }
