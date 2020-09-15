import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { CollectVoucherComponent } from './collect-voucher.component';

const COMPONENTS = [CollectVoucherComponent];

const routes = [
  {
    path: 'collect-voucher',
    component: CollectVoucherComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Collect Voucher',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
})
export class CollectVoucherModule {}
