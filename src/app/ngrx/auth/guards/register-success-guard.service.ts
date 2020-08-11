import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegisterSuccessService implements CanActivate {
  constructor(private authStore: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkCustomerExist();
  }

  checkCustomerExist(): Observable<boolean> {
    return this.authStore.pipe(select(fromAuth.getCustomerFetched)).pipe(
      map(customer => {
        if (customer) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
