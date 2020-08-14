import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
// import { ProductsModule } from 'app/ngrx/products';
import { CategoryComponent } from './filter/category/category.component';
import { CategoryPipe } from './pipe/category.pipe';
import { ColorPipe } from './pipe/color.pipe';
import { ProductAttributeComponent } from './filter/product-attribute/product-attribute.component';
import { ProductOptionComponent } from './filter/product-option/product-option.component';
import { ProductBrandComponent } from './filter/product-brand/product-brand.component';
import { PriceComponent } from './filter/price/price.component';
import { ConditionComponent } from './filter/condition/condition.component';
import { RatingComponent } from './filter/rating/rating.component';

@NgModule({
  declarations: [
    SearchComponent,
    CategoryComponent,
    CategoryPipe,
    ColorPipe,
    ProductAttributeComponent,
    ProductOptionComponent,
    ProductBrandComponent,
    PriceComponent,
    ConditionComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    RootSharedModule,
    PartialsModule,
    // ProductsModule
  ],
})
export class SearchModule {}
