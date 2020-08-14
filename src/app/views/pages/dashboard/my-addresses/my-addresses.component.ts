import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { Addresses, IAddresses, IPeople, ICustomers } from '@vertical/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { AddressActions } from 'app/ngrx/checkout/actions';
import { AccountService } from '@vertical/core';
import { Account } from '@vertical/core/user/account.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss'],
})
export class MyAddressesComponent implements OnInit, OnDestroy {
  account: Account;
  addresses$: Observable<IAddresses[]>;
  addressSubscription: Subscription;
  people$: Observable<IPeople>;
  people: IPeople;
  customer$: Observable<ICustomers>;
  customer: ICustomers;
  addNewAddressInd = false;
  loading = false;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromCheckout.State>,
    private authStore: Store<fromAuth.State>,
    private accountService: AccountService,
    private nzMessageService: NzMessageService
  ) {
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched));
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
      if (this.people) {
        console.log('people', this.people);
        this.store.dispatch(AddressActions.fetchAddresses({ query: { 'personId.equals': this.people.id } }));
      }
    });

    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

  onAddNewAddress(event): void {
    this.addNewAddressInd = true;
  }

  onEditAddress(event): void {}

  onSetDefault(event: IAddresses): void {
    if (event && !event.defaultInd) {
      this.store.dispatch(AddressActions.setDefault({ props: { addressId: event.id, isShippingAddress: true, peopleId: this.people.id } }));
    }
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(event): void {
    this.store.dispatch(AddressActions.removeAddress({ address: event }));
  }

  onDeleteAddress(event): void {
    this.store.dispatch(AddressActions.removeAddress({ address: event }));
  }

  trackId(index: number, item: IAddresses): number {
    return item.id;
  }

  onCancel(event): void {
    this.addNewAddressInd = false;
  }

  onCreateCompleted(event): void {
    this.addNewAddressInd = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
