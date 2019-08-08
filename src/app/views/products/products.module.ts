import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { CoreModule } from 'app/core/core.module';
import { FormsModule } from '@angular/forms';
import { RootSharedModule } from '@root/shared.module';
import { ReviewsProductComponent } from './reviews-product/reviews-product.component';

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
    canActivate: []
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
    FormsModule,
    RootSharedModule,
    CoreModule
  ],
  providers: []
})
export class ProductsModule { }
