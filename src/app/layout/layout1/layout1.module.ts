import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@epm/shared.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';
import { HeaderModule } from 'app/layout/components/header/header.module';
import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { FooterFixedModule } from 'app/layout/components/footer-fixed/footer-fixed.module';

import { Layout1Component } from './layout1.component';

@NgModule({
  declarations: [
    Layout1Component
  ],
  imports: [
    RouterModule,
    RootSharedModule,
    CommonModule,
    ToolbarModule,
    HeaderModule,
    ContentModule,
    FooterModule,
    FooterFixedModule
  ],
  exports: [
    Layout1Component
  ]
})
export class Layout1Module { }
