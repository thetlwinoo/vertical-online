/* eslint-disable guard-for-in */
/* tslint:disable */
import { Component, HostBinding, ViewEncapsulation, OnDestroy, OnInit, Input, OnChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IAddresses, IPeople, ICustomers, ITownships, IRegions, ICities, IAddressTypes, Addresses, Customers } from '@vertical/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { AddressActions } from 'app/ngrx/checkout/actions';
import { AccountService } from '@vertical/core';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionsService, CitiesService, TownshipsService, AddressTypesService, CustomersService } from '@vertical/services';
import { HttpResponse } from '@angular/common/http';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DATE_TIME_FORMAT } from '@vertical/constants';
import * as moment from 'moment';
import { CustomerActions } from 'app/ngrx/auth/actions';

type SelectableEntity = ITownships | IRegions | ICities | IAddressTypes;

@Component({
  selector: 'vs-address-update',
  templateUrl: './addresses-update.component.html',
  styleUrls: ['./addresses-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VSAddressesUpdateComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class') class = 'vs-addresses-update';
  @Input() addresses?: IAddresses;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() isShipping?: boolean;

  customer$: Observable<ICustomers>;
  customer: ICustomers;
  addresses$: Observable<IAddresses[]>;
  addressList: IAddresses[] = [];
  selectAddressId: number;
  people$: Observable<IPeople>;
  people: IPeople;
  addNewAddressInd = false;
  townships: ITownships[] = [];
  regions: IRegions[] = [];
  addressTypes: IAddressTypes[] = [];
  cities: ICities[] = [];

  selectedRegionsId: number;

  get cityId(): number {
    return this.editForm.get('cityId')?.value || null;
  }

  get city(): ICities {
    return this.cities.find(x => x.id === this.editForm.get('cityId')?.value) || null;
  }

  get regionId(): number {
    return this.editForm.get('regionId')?.value || null;
  }

  get region(): IRegions {
    return this.regions.find(x => x.id === this.editForm.get('regionId')?.value) || null;
  }

  get townshipId(): number {
    return this.editForm.get('townshipId')?.value || null;
  }

  get township(): ITownships {
    return this.townships.find(x => x.id === this.editForm.get('townshipId')?.value) || null;
  }

  editForm = this.fb.group({
    id: [],
    contactPerson: [],
    contactNumber: [],
    contactEmailAddress: [null, [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    addressLine1: [null, [Validators.required]],
    addressLine2: [],
    postalCode: [],
    description: [],
    validFrom: [moment(new Date(), DATE_TIME_FORMAT), [Validators.required]],
    validTo: [],
    regionId: [],
    cityId: [],
    townshipId: [],
    addressTypeId: [],
    customerId: [],
    supplierId: [],
  });

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromCheckout.State>,
    private router: Router,
    private accountService: AccountService,
    private authStore: Store<fromAuth.State>,
    private regionsService: RegionsService,
    private citiesService: CitiesService,
    private addressTypesService: AddressTypesService,
    private townshipsService: TownshipsService,
    private customersService: CustomersService,
    private fb: FormBuilder,
    private modal: NzModalRef
  ) {
    this.addresses$ = this.store.pipe(select(fromCheckout.getAddressesFetched));
    this.people$ = this.authStore.pipe(select(fromAuth.getPeopleFetched));
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));

    // this.createAddresForm();
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
    });

    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.customer = item;

      if (this.customer) {
        this.store.dispatch(AddressActions.fetchAddresses({ query: { 'customerId.equals': this.customer.id } }));
        this.editForm.patchValue({ customerId: this.customer.id });

        this.selectAddressId = this.isShipping ? this.customer.deliveryAddressId : this.customer.billToAddressId;
      }
    });

    this.addresses$.pipe(takeUntil(this.unsubscribe$)).subscribe(addresses => {
      this.addressList = addresses;

      const updateAddresses = addresses.find(x => x.id === this.selectAddressId);
      this.updateForm(updateAddresses);
    });

    this.regionsService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<IRegions[]>) => {
        this.regions = res.body || [];
        // this.selectedRegionsId = res.body.filter(regions => regions.name === 'Yangon')[0].id;

        // this.editForm.patchValue({ regionId: this.selectedRegionsId });
      });

    this.citiesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<ICities[]>) => (this.cities = res.body || []));

    this.townshipsService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<ITownships[]>) => (this.townships = res.body || []));

    this.addressTypesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<IAddressTypes[]>) => (this.addressTypes = res.body || []));
  }

  ngOnChanges(): void {
    if (this.addresses) {
      if (!this.addresses.id) {
        const today = moment().startOf('day');
        this.addresses.validFrom = today;
        this.addresses.validTo = today;
      }

      this.updateForm(this.addresses);
    }
  }

  submitForm(): void {
    if (this.addNewAddressInd) {
      for (const i in this.editForm.controls) {
        this.editForm.controls[i].markAsDirty();
        this.editForm.controls[i].updateValueAndValidity();
      }

      const saveAddresses = this.createFromForm();
      if (this.editForm.valid) {
        if (saveAddresses.id) {
          this.store.dispatch(AddressActions.updateAddress({ address: saveAddresses, isShipping: this.isShipping }));
        } else {
          this.store.dispatch(AddressActions.createAddress({ address: saveAddresses, isShipping: this.isShipping }));
        }
        this.destroyModal('success');
      }
    } else {
      this.store.dispatch(CustomerActions.updateCustomer({ customers: this.customer }));
      this.destroyModal('list');
    }
  }

  changeCustomerAddress(event): void {
    const customers: ICustomers = {
      id: this.customer.id,
      name: this.customer.name,
      accountNumber: this.customer.accountNumber,
      accountOpenedDate: this.customer.accountOpenedDate,
      standardDiscountPercentage: this.customer.standardDiscountPercentage,
      isStatementSent: this.customer.isStatementSent,
      isOnCreditHold: this.customer.isOnCreditHold,
      paymentDays: this.customer.paymentDays,
      deliveryRun: this.customer.deliveryRun,
      runPosition: this.customer.runPosition,
      profilePhoto: this.customer.profilePhoto,
      billToAddressSameAsDeliveryAddress: this.customer.billToAddressSameAsDeliveryAddress,
      lastEditedBy: this.customer.lastEditedBy,
      activeFlag: this.customer.activeFlag,
      validFrom: this.customer.validFrom,
      validTo: this.customer.validTo,
      peopleId: this.customer.peopleId,
      deliveryMethodId: this.customer.deliveryMethodId,
      deliveryAddressId: this.customer.deliveryAddressId,
      billToAddressId: this.customer.billToAddressId,
    };

    if (this.isShipping) {
      customers.deliveryAddressId = event;
    } else {
      customers.billToAddressId = event;
    }
    customers.billToAddressSameAsDeliveryAddress = customers.deliveryAddressId === customers.billToAddressId;
    this.customer = customers;
  }

  updateForm(addresses: IAddresses): void {
    this.editForm.patchValue({
      id: addresses.id,
      contactPerson: addresses.contactPerson,
      contactNumber: addresses.contactNumber,
      contactEmailAddress: addresses.contactEmailAddress,
      addressLine1: addresses.addressLine1,
      addressLine2: addresses.addressLine2,
      postalCode: addresses.postalCode,
      description: addresses.description,
      validFrom: addresses.validFrom ? addresses.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: addresses.validTo ? addresses.validTo.format(DATE_TIME_FORMAT) : null,
      regionId: addresses.regionId,
      cityId: addresses.cityId,
      townshipId: addresses.townshipId,
      addressTypeId: addresses.addressTypeId,
      customerId: addresses.customerId,
      supplierId: addresses.supplierId,
    });
  }

  selectCity(cityId: number): void {
    this.townshipsService
      .query({ 'cityId.equals': cityId })
      .subscribe((res: HttpResponse<ITownships[]>) => (this.townships = res.body || []));
  }

  selectRegion(regionId: number): void {
    this.citiesService.query({ 'regionId.equals': regionId }).subscribe((res: HttpResponse<ICities[]>) => (this.cities = res.body || []));
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

  private createFromForm(): IAddresses {
    return {
      ...new Addresses(),
      id: this.editForm.get(['id'])!.value,
      contactPerson: this.editForm.get(['contactPerson'])!.value,
      contactNumber: this.editForm.get(['contactNumber'])!.value,
      contactEmailAddress: this.editForm.get(['contactEmailAddress'])!.value,
      addressLine1: this.editForm.get(['addressLine1'])!.value,
      addressLine2: this.editForm.get(['addressLine2'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      description: this.editForm.get(['description'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      regionId: this.editForm.get(['regionId'])!.value,
      cityId: this.editForm.get(['cityId'])!.value,
      townshipId: this.editForm.get(['townshipId'])!.value,
      addressTypeId: this.editForm.get(['addressTypeId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
    };
  }
}
