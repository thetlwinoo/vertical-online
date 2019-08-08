import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@root/shared.module';
import { ProductBoxComponent } from './products/product-box/product-box.component';
import { ProductCardComponent } from './products/product-card/product-card.component';

@NgModule({
  declarations: [
    ProductBoxComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RootSharedModule
  ],
  exports: [
    ProductBoxComponent,
    ProductCardComponent
  ]
})
export class CoreComponentsModule { }
