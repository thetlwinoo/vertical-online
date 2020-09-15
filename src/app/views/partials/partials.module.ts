import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';

import { ProductBoxComponent, ProductCardComponent, GhostItemComponent, OfficialStoreComponent, ProductBrandComponent } from './products';
import { VoucherCardComponent, CashBackCardComponent } from './promotions';

const COMPONENTS = [
  ProductBoxComponent,
  ProductCardComponent,
  GhostItemComponent,
  OfficialStoreComponent,
  ProductBrandComponent,
  VoucherCardComponent,
  CashBackCardComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [RootSharedModule, RouterModule],
  entryComponents: [],
})
export class PartialsModule {}
