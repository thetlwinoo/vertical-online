import { NgModule } from '@angular/core';
import { RootSharedModule } from '@eps/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SliderBannerComponent } from './components/slider-banner/slider-banner.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { FlashDealsComponent } from './components/flash-deals/flash-deals.component';
import { BrandZoneComponent } from './components/brand-zone/brand-zone.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { NewlyAddedComponent } from './components/newly-added/newly-added.component';
import { SubBannerComponent } from './components/sub-banner/sub-banner.component';
import { DailyDiscoverComponent } from './components/daily-discover/daily-discover.component';
import { ProductsModule } from 'app/ngrx/products';

const routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      crumbs: [],
      title: 'Home',
    },
    // canActivate: [BreadcrumbGuard],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    SliderBannerComponent,
    ProductCategoryComponent,
    FlashDealsComponent,
    BrandZoneComponent,
    MostPopularComponent,
    NewlyAddedComponent,
    SubBannerComponent,
    DailyDiscoverComponent,
  ],
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule, ProductsModule],
})
export class HomeModule {}
