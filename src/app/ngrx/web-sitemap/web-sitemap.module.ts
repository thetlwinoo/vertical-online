import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {
  HomePageEffects,
  FlashDealCollectionPageEffects,
  BrandCollectionPageEffects,
  CashBackPageEffects,
  CategoriesPageEffects,
  CollectVoucherPageEffects,
  OfficialStoresPageEffects,
  SearchPageEffects,
  TermsAndConditionPageEffects,
} from 'app/ngrx/web-sitemap/effects';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { WebSitemapService } from '@vertical/services';

export const COMPONENTS = [];

export const CONTAINERS = [];

export const SERVICES = [WebSitemapService];

export const EFFECTS = [
  HomePageEffects,
  FlashDealCollectionPageEffects,
  BrandCollectionPageEffects,
  CashBackPageEffects,
  CategoriesPageEffects,
  CollectVoucherPageEffects,
  OfficialStoresPageEffects,
  SearchPageEffects,
  TermsAndConditionPageEffects,
];

@NgModule({
  imports: [
    RootSharedModule,
    PartialsModule,
    StoreModule.forFeature(fromWebSitemap.webSitemapFeatureKey, fromWebSitemap.reducers),

    EffectsModule.forFeature([...EFFECTS]),
    CarouselModule,
  ],
  declarations: [...COMPONENTS, ...CONTAINERS],
  providers: [...SERVICES],
})
export class NgrxWebSitemapModule {}
