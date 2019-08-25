import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from "app/ngrx/app.reducers";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Addresses, IAddresses } from '@root/models';
import { HttpError } from "app/ngrx/app.reducers";
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { AddressActions } from 'app/ngrx/checkout/actions';
import { AccountService } from '@root/services/core/auth/account.service';
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

  innerLoading: boolean = true;
  addNewAddressInd: boolean = false;

  constructor(
    private store: Store<fromCheckout.State>,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched)) as Observable<IAddresses[]>;

    this.addressSubscription = this.addresses$.subscribe(addresses => {
      console.log('addresses', addresses)
      if (addresses && addresses.length <= 0) {
        this.router.navigate(['pages/dashboard/address-book/new/']);
      }
    });
  }

  ngOnInit() {
    console.log('add init')
    this.store.dispatch(AddressActions.fetchAddresses());

    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.innerLoading = false;
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
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }
}
