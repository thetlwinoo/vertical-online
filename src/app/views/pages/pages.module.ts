import { NgModule } from '@angular/core';
import { DashboardModule } from 'app/views/pages/dashboard/dashboard.module';
import { TermsAndConditionsModule } from 'app/views/pages/terms-and-conditions/terms-and-conditions.module';
import { OfficialStoresModule } from 'app/views/pages/official-stores/official-stores.module';
import { BrandCollectionModule } from 'app/views/pages/brand-collection/brand-collection.module';
import { CategoriesModule } from 'app/views/pages/categories/categories.module';
import { FlashDealCollectionModule } from './flash-deal-collection/flash-deal-collection.module';
import { CashBackModule } from './cash-back/cash-back.module';
import { CollectVoucherModule } from './collect-voucher/collect-voucher.module';
import { MadeInMyanmarModule } from './made-in-myanmar/made-in-myanmar.module';
import { FreeShippingModule } from './free-shipping/free-shipping.module';

const MODULES = [
  DashboardModule,
  OfficialStoresModule,
  TermsAndConditionsModule,
  BrandCollectionModule,
  CategoriesModule,
  FlashDealCollectionModule,
  CashBackModule,
  CollectVoucherModule,
  MadeInMyanmarModule,
  FreeShippingModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [],
})
export class PagesModule {}
