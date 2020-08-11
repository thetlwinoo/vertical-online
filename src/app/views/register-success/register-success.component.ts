import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { IOrders, IPeople, ICustomers } from '@eps/models';
import { ActivatedRoute } from '@angular/router';
import { SERVER_API_URL } from '@eps/constants';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@eps/core';
import { CustomerActions } from 'app/ngrx/auth/actions';

@Component({
  selector: 'register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss'],
})
export class RegisterSuccessComponent implements OnInit, AfterViewInit, OnDestroy {
  customer$: Observable<ICustomers>;
  customer: ICustomers;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(protected activatedRoute: ActivatedRoute, private authStore: Store<fromAuth.State>, private authService: AuthService) {
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));
  }

  ngOnInit(): void {
    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe(customer => {
      this.customer = customer;
    });
  }

  ngAfterViewInit(): void {
    console.log('customer', this.customer);
    if (!this.customer) {
      this.authStore.dispatch(CustomerActions.createCustomerAccount());
    }
  }

  // login(): void {
  //   this.authService.login();
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
