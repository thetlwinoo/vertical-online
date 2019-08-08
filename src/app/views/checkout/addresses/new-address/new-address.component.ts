import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import * as OrderActions from "app/store/order/order.actions";
import * as AddressesActions from "app/ngrx/adresses/addresses.actions";
import { BusinessEntityObject } from "app/ngrx/order/order.reducer";
import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import * as BlankValidators from "app/core/e-commerce/_services/validators/blank.validator";
import { Account, IAddressTypes, IStateProvinces, IPhoneNumberType, Addresses } from 'app/core/e-commerce/_models';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AddressTypesService } from '../services/address-types.service';
// import { PhoneNumberTypeService } from '../services/phone-number-type.service';
// import { StateProvincesService } from '../services/state-provinces.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {
  @Output() createCompleted = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() noOfAddress;
  @Input() account: Account;

  businessEntityForm: FormGroup;
  emailPattern: string = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
  addresstypes: IAddressTypes[];
  phoneNumberTypes: IPhoneNumberType[];
  stateProvinces: IStateProvinces[];
  selectedAddressType: IAddressTypes;
  sameWithBilling: boolean = true;
  addresses: Addresses = null;
  mandatoryDefault: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    protected addressTypesService: AddressTypesService,
    // private phoneNumberTypeService: PhoneNumberTypeService,
    // protected stateProvincesService: StateProvincesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addresses = new Addresses();
    this.addresses.defaultInd = true;

    this.addressTypesService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAddressTypes[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAddressTypes[]>) => response.body)
      )
      .subscribe((res: IAddressTypes[]) => (this.addresstypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  save() {
    this.store.dispatch(new AddressesActions.CreateAddresses(this.addresses));
    this.createCompleted.emit();
    // this.router.navigate(["/checkout/payment"]);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }

}
