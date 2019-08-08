import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NonAuthGuardService } from "app/core/e-commerce/_services/non-auth-guard.service";

const routes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [
      NonAuthGuardService
    ],
    data: {
      crumbs: [{
        label: 'signin'
      }]
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [
      NonAuthGuardService
    ],
    data: {
      crumbs: [{
        label: 'signup'
      }]
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [
      NonAuthGuardService
    ],
    data: {
      crumbs: [{
        label: 'forgot password'
      }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }
