import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellOnStoreRoutingModule } from './sell-on-store-routing.module';
import { SellOnStoreComponent } from './sell-on-store.component';

@NgModule({
  declarations: [SellOnStoreComponent],
  imports: [
    CommonModule,
    SellOnStoreRoutingModule
  ]
})
export class SellOnStoreModule { }
