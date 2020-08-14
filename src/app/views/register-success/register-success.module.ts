import { NgModule } from '@angular/core';
import { RootSharedModule } from '@vertical/shared.module';
import { RouterModule } from '@angular/router';

import { RegisterSuccessComponent } from './register-success.component';

const routes = [
  {
    path: '',
    component: RegisterSuccessComponent,
    // canActivate: [BreadcrumbGuard],
  },
];

const COMPONENTS = [RegisterSuccessComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [RouterModule.forChild(routes), RootSharedModule],
})
export class RegisterSuccessModule {}
