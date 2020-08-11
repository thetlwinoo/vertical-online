/* eslint-disable guard-for-in */
import { Component, ChangeDetectionStrategy, HostBinding, ViewEncapsulation, OnDestroy, OnInit, Input, OnChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IAddresses, IPeople, ICustomers, IZone, ICountries, ICities, IAddressTypes } from '@eps/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { AddressActions } from 'app/ngrx/checkout/actions';
import { AccountService } from '@eps/core';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountriesService, CitiesService, ZoneService, AddressTypesService } from '@eps/services';
import { HttpResponse } from '@angular/common/http';
import { NzModalRef } from 'ng-zorro-antd/modal';

type SelectableEntity = IZone | ICountries | ICities | IAddressTypes;

@Component({
  selector: 'vs-address-update',
  templateUrl: './addresses-update.component.html',
  styleUrls: ['./addresses-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VSAddressesUpdateComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'vs-addresses-update';
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() isShipping?: boolean;

  customer$: Observable<ICustomers>;
  customer: ICustomers;
  addresses$: Observable<IAddresses[]>;
  addresses: IAddresses[];
  selectAddressId: number;
  people$: Observable<IPeople>;
  people: IPeople;
  addNewAddressInd = false;

  addressForm!: FormGroup;
  zones: IZone[] = [];
  countries: ICountries[] = [];
  addressTypes: IAddressTypes[] = [];
  cities: ICities[] = [];

  selectedCountryId: number;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromCheckout.State>,
    private router: Router,
    private accountService: AccountService,
    private authStore: Store<fromAuth.State>,
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private addressTypesService: AddressTypesService,
    private zoneService: ZoneService,
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched));
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));

    this.createAddresForm();
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
      if (this.people) {
        this.store.dispatch(AddressActions.fetchAddresses({ query: { 'personId.equals': this.people.id } }));
        this.addressForm.patchValue({ personId: this.people.id });
      }
    });

    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => (this.customer = item));

    this.addresses$.pipe(takeUntil(this.unsubscribe$)).subscribe(addresses => {
      this.addresses = addresses;

      console.log('addresses', addresses, 'customers', this.customer);
    });

    this.countriesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<ICountries[]>) => {
        this.countries = res.body || [];
        this.selectedCountryId = res.body.filter(country => country.name === 'Myanmar')[0].id;

        this.addressForm.patchValue({ countryId: this.selectedCountryId });
      });

    this.citiesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<ICities[]>) => (this.cities = res.body || []));

    this.zoneService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<IZone[]>) => (this.zones = res.body || []));

    this.addressTypesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<IAddressTypes[]>) => (this.addressTypes = res.body || []));

    if (this.customer && this.addresses) {
      if (this.addresses.length > 0) {
        if (this.isShipping) {
          this.selectAddressId = this.addresses.filter(item => item.id === this.customer.deliveryAddressId)[0].id;
        } else {
          this.selectAddressId = this.addresses.filter(item => item.id === this.customer.billToAddressId)[0].id;
        }
      } else {
        this.addNewAddressInd = true;
      }
    }
  }

  submitForm(): void {
    if (this.addNewAddressInd) {
      // tslint:disable-next-line: forin
      for (const i in this.addressForm.controls) {
        this.addressForm.controls[i].markAsDirty();
        this.addressForm.controls[i].updateValueAndValidity();
      }

      if (this.addressForm.valid) {
        console.log('this.isShipping', this.isShipping);
        this.store.dispatch(AddressActions.createAddress({ address: this.addressForm.getRawValue(), isShipping: this.isShipping }));

        if (this.addresses.length > 1) {
          this.addNewAddressInd = false;
        } else {
          this.destroyModal('success');
        }
      }
    } else {
      if (this.selectAddressId) {
        this.store.dispatch(
          AddressActions.setDefault({
            props: { addressId: this.selectAddressId, isShippingAddress: this.isShipping, peopleId: this.people.id },
          })
        );
      }
      this.destroyModal('list');
    }
  }

  createAddresForm(): void {
    this.addressForm = this.fb.group({
      contactPerson: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]],
      contactEmailAddress: [null],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null],
      addressTypeId: [null, Validators.required],
      city: [null],
      postalCode: [null],
      defaultInd: true,
      activeInd: true,
      personId: [null],
      countryId: [null, Validators.required],
      cityId: [null, Validators.required],
      zoneId: [null, Validators.required],
    });
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  destroyModal(result): void {
    this.modal.destroy({ data: result });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
