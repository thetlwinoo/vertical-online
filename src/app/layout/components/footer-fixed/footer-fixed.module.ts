import { NgModule } from '@angular/core';
import { FooterFixedComponent } from './footer-fixed.component';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';

@NgModule({
  declarations: [FooterFixedComponent],
  imports: [RootSharedModule, RouterModule],
  exports: [FooterFixedComponent],
})
export class FooterFixedModule {}
