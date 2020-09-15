import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { FreeShippingComponent } from './free-shipping.component';

const COMPONENTS = [FreeShippingComponent];

const routes = [
  {
    path: 'free-shipping',
    component: FreeShippingComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Free Shipping',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
})
export class FreeShippingModule {}
