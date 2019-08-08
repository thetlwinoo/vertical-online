import { NgModule } from '@angular/core';
import { RootSharedModule } from '@root/shared.module';
import { HeaderComponent } from './header.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBoxComponent
  ],
  imports: [
    RootSharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
