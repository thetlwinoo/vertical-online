import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@eps/shared.module';

import { ProductBoxComponent, ProductCardComponent, GhostItemComponent, OfficialStoreComponent, ProductBrandComponent } from './products';

const COMPONENTS = [ProductBoxComponent, ProductCardComponent, GhostItemComponent, OfficialStoreComponent, ProductBrandComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [RootSharedModule, RouterModule],
  entryComponents: [],
})
export class PartialsModule {}
