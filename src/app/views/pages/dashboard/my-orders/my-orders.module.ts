import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { MyOrdersComponent, myOrdersRoute, OrderDetailsComponent } from './';
import { PartialsModule } from 'app/views/partials/partials.module';
import { MostPopularComponent } from '../components/most-popular/most-popular.component';

const ENTITY_STATES = [...myOrdersRoute];

@NgModule({
  imports: [RootSharedModule, RouterModule.forChild(ENTITY_STATES), PartialsModule],
  declarations: [MyOrdersComponent, OrderDetailsComponent, MostPopularComponent],
  entryComponents: [MyOrdersComponent, OrderDetailsComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyOrdersModule {}
