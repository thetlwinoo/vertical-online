import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      crumbs: [],
    },
  },
  // {
  //   path: ':keyword',
  //   component: SearchComponent,
  //   resolve: {
  //     pagingParams: JhiResolvePagingParams,
  //   },
  //   data: {
  //     crumbs: [],
  //   },
  //   canActivate: [],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
