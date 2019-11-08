import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Addresses, IAddresses } from '@epm/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { AddressActions } from 'app/ngrx/checkout/actions';
import { AccountService } from '@epm/services/core/auth/account.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss']
})
export class MyAddressesComponent implements OnInit, OnDestroy {
  account: Account;
  addresses$: Observable<IAddresses[]>;
  addressSubscription: Subscription;
  addNewAddressInd: boolean = false;

  constructor(
    private store: Store<fromCheckout.State>,
    private accountService: AccountService,
    private confirmationService: ConfirmationService
  ) {
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched)) as Observable<IAddresses[]>;
  }

  ngOnInit() {
    console.log('add init')
    this.store.dispatch(AddressActions.fetchAddresses());

    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
  }

  onAddNewAddress(event) {
    this.addNewAddressInd = true;
  }

  onEditAddress(event) {

  }

  onSetDefault(event) {
    console.log(event)
    if (event) {
      this.store.dispatch(AddressActions.setDefault({ id: event.id }));
    }
  }

  onDeleteAddress(event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.store.dispatch(AddressActions.removeAddress({ address: event }));
      }
    });
  }

  trackId(index: number, item: IAddresses) {
    return item.id;
  }

  onCancel(event) {
    this.addNewAddressInd = false;
  }

  onCreateCompleted(event) {
    this.addNewAddressInd = false;
  }

  ngOnDestroy() {
  }
}
