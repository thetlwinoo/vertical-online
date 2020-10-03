import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { DailyDiscoverComponent } from './daily-discover.component';

const COMPONENTS = [DailyDiscoverComponent];

const routes = [
  {
    path: 'daily-discover',
    component: DailyDiscoverComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Daily Discover',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
})
export class DailyDiscoverModule {}
