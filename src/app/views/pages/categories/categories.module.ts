import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';
import { PartialsModule } from 'app/views/partials/partials.module';

const COMPONENTS = [CategoriesComponent];

const routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Categories',
    },
  },
  {
    path: 'categories/:id',
    component: CategoriesComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Categories',
    },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), RootSharedModule, PartialsModule],
  declarations: [...COMPONENTS],
  exports: [RouterModule],
  providers: [],
})
export class CategoriesModule {}
