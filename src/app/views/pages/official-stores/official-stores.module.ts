import { NgModule } from '@angular/core';
import { OfficialStoresComponent } from './official-stores.component';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';

const COMPONENTS = [OfficialStoresComponent];

const routes = [
  {
    path: 'official-stores',
    component: OfficialStoresComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Official Stores',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
  exports: [RouterModule],
})
export class OfficialStoresModule {}
