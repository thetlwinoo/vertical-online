import { NgModule } from '@angular/core';
import { RootSharedModule } from '@root/shared.module';
import { HeaderComponent } from './header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductsModule } from 'app/ngrx/products';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent
  ],
  imports: [
    RootSharedModule,
    ProductsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
