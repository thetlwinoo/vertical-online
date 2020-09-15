import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { FlashDealCollectionComponent } from './flash-deal-collection.component';

const COMPONENTS = [FlashDealCollectionComponent];

const routes = [
  {
    path: 'flash-deal-collection',
    component: FlashDealCollectionComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Flash Deals',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
})
export class FlashDealCollectionModule {}
