import { NgModule } from '@angular/core';
import { BrandCollectionComponent } from './brand-collection.component';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';
import { BrandCollectionPipe } from './brand-collection.pipe';

const COMPONENTS = [BrandCollectionComponent];

const routes = [
  {
    path: 'brand-collection',
    component: BrandCollectionComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Brand Collection',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS, BrandCollectionPipe],
  exports: [RouterModule],
})
export class BrandCollectionModule {}
