import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RootPipesModule } from '@eps/pipes';
import { RootDirectivesModule } from '@eps/directives/directives';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RootSidebarModule } from '@eps/components';

import { MaterialModule, NgZorroAntdModule, PrimengModule } from '@eps/modules';
import { NgArrayPipesModule, OrderByPipe } from 'ngx-pipes';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    FlexLayoutModule,
    RootDirectivesModule,
    RootPipesModule,
    RootSidebarModule,

    MaterialModule,
    NgZorroAntdModule,
    PrimengModule,

    NgbModule,
    NgJhipsterModule,
    FontAwesomeModule,
    DeferLoadModule,
    NgArrayPipesModule,
    CarouselModule,
    NgxPicaModule,
  ],
  providers: [OrderByPipe],
})
export class ResourceSharedLibsModule {}
