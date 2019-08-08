import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from "./search.component";

const routes: Routes = [
  {
    path: ':keyword',
    component: SearchComponent,
    data: {
      crumbs: []
    },
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
