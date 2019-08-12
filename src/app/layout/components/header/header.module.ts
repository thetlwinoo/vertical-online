import { NgModule } from '@angular/core';
import { RootSharedModule } from '@root/shared.module';
import { HeaderComponent } from './header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent
  ],
  imports: [
    RootSharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
