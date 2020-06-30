import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@eps/shared.module';
import { MyCompareComponent, myCompareRoute } from './';
import { CarouselModule } from 'ngx-owl-carousel-o';

const ENTITY_STATES = [...myCompareRoute];

@NgModule({
  imports: [RootSharedModule, RouterModule.forChild(ENTITY_STATES), CarouselModule],
  declarations: [MyCompareComponent],
  entryComponents: [MyCompareComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyCompareModule {}
