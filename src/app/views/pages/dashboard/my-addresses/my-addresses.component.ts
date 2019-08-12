import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { Addresses, IAddresses } from '@root/models';
import { HttpError } from "app/ngrx/app.reducers";
import * as AddressActions from "app/ngrx/adresses/addresses.actions";
import { AccountService } from '@root/services/core/auth/account.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss']
})
export class MyAddressesComponent implements OnInit, OnDestroy {
  account: Account;
  addressState: Observable<{ addresses: any[], errors: HttpError[], loading: boolean }>;
  addressSubscription: Subscription;

  innerLoading: boolean = true;
  addNewAddressInd: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.store.dispatch(new AddressActions.FetchAddresses);
    this.addressState = this.store.select('addresses');

    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.innerLoading = false;
    });

    this.addressSubscription = this.addressState.subscribe(data => {
      if(data && !data.loading && data.addresses)
      {
        if(data.addresses.length <= 0) this.router.navigate(['pages/dashboard/address-book/new/']);
      }
    })
  }

  onAddNewAddress(event) {
    this.addNewAddressInd = true;
  }

  onEditAddress(event) {

  }

  onSetDefault(event) {
    console.log(event)
    if (event) {
      this.store.dispatch(new AddressActions.SetDefault(event.id));
    }
  }

  onDeleteAddress(event) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.store.dispatch(new AddressActions.RemoveAddresses(event.id));
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
    // this.store.dispatch(new AddressActions.FetchAddresses);
  }

  ngOnDestroy() {
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }
}
