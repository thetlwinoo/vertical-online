import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { CashBackComponent } from './cash-back.component';

const COMPONENTS = [CashBackComponent];

const routes = [
  {
    path: 'cash-back',
    component: CashBackComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Cash Back',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
})
export class CashBackModule {}
