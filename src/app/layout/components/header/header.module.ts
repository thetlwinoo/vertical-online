import { NgModule } from '@angular/core';
import { RootSharedModule } from '@eps/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [HeaderComponent, SearchBarComponent],
  imports: [RootSharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
