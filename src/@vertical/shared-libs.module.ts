import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RootPipesModule } from '@vertical/pipes';
import { RootDirectivesModule } from '@vertical/directives/directives';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RootSidebarModule } from '@vertical/components';

import { NgZorroAntdModule } from '@vertical/modules';
import { NgArrayPipesModule, OrderByPipe } from 'ngx-pipes';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PinchZoomModule } from '@vertical/third-party-libs/ivypinch/pinch-zoom.module';
@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    FlexLayoutModule,
    RootDirectivesModule,
    RootPipesModule,
    RootSidebarModule,

    // MaterialModule,
    NgZorroAntdModule,

    NgbModule,
    NgJhipsterModule,
    FontAwesomeModule,
    DeferLoadModule,
    NgArrayPipesModule,
    CarouselModule,
    PinchZoomModule,
  ],
  providers: [OrderByPipe],
})
export class ResourceSharedLibsModule {}
