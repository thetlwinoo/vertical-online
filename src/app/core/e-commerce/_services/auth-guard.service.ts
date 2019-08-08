import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "app/ngrx/app.reducers";
import * as fromAuth from "app/ngrx/auth/auth.reducer";
import 'rxjs/add/operator/take';
import { LoginModalService } from 'app/core/auth/login/login-modal.service';
import { AccountService } from 'app/core/auth/services/account.service';
import { LoginService } from 'app/core/auth/login/login.service';
import { Account } from '../_models';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class AuthGuardService implements CanActivate {
  account: Account;
  modalRef: NgbModalRef;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private accountService: AccountService,
    private loginService: LoginService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();

    // return this.store.select('auth')
    //   .take(1)
    //   .map((authState: fromAuth.State) => {
    //     if (!authState.authenticated) {
    //       this.router.navigate(["/login"]);
    //     }
    //     return authState.authenticated;
    //   });    

    return true;
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;

        if (!this.isAuthenticated()) {
          this.login();
        }
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }
}
