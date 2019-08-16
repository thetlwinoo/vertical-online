import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { RootSidebarModule } from '@root/components/sidebar/sidebar.module';
import { RootSharedModule } from '@root/shared.module';
// import { ProductsModule } from 'app/ngrx/products';
import { CategoryComponent } from './filter/category/category.component';
import { CategoryPipe } from './pipe/category.pipe';
import { ColorPipe } from './pipe/color.pipe';
import { ColorComponent } from './filter/color/color.component';
import { PriceComponent } from './filter/price/price.component';
import { ConditionComponent } from './filter/condition/condition.component';
import { RatingComponent } from './filter/rating/rating.component';

@NgModule({
  declarations: [
    SearchComponent,
    CategoryComponent,
    CategoryPipe,
    ColorPipe,
    ColorComponent,
    PriceComponent,
    ConditionComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    RootSharedModule,
    RootSidebarModule,
    // ProductsModule
  ]
})
export class SearchModule { }
