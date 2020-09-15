import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { MadeInMyanmarComponent } from './made-in-myanmar.component';

const COMPONENTS = [MadeInMyanmarComponent];

const routes = [
  {
    path: 'made-in-myanmar',
    component: MadeInMyanmarComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Made In Myanmar',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
})
export class MadeInMyanmarModule {}
