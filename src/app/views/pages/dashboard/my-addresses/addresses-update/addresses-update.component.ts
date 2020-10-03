/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAddressTypes, Addresses, IPeople, ITownships, IAddresses, IRegions, ICities, ICustomers } from '@vertical/models';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { AddressTypeActions, AddressActions } from 'app/ngrx/checkout/actions';

// import * as AddressesActions from "app/store/adresses/addresses.actions";
import {
  AddressesService,
  AddressTypesService,
  TownshipsService,
  RegionsService,
  CitiesService,
  CustomersService,
} from '@vertical/services';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { DATE_TIME_FORMAT } from '@vertical/constants';
import * as moment from 'moment';

type SelectableEntity = IRegions | ITownships | IAddressTypes | IPeople;

@Component({
  selector: 'app-addresses-update',
  templateUrl: './addresses-update.component.html',
  styleUrls: ['./addresses-update.component.scss'],
})
export class AddressesUpdateComponent implements OnInit, OnDestroy {
  addresses: any;
  personPhone: any;
  personEmailAddress: any;
  isSaving: boolean;
  selectedAddressType: IAddressTypes;
  activatedRouteSubscription: Subscription;
  addressTypes: IAddressTypes[];
  customer$: Observable<ICustomers>;
  customer: ICustomers;
  townships: ITownships[];
  regions: IRegions[] = [];
  cities: ICities[] = [];

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

  selectedRegionsId: number;
  selectedCityId: number;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected customersService: CustomersService,
    protected townshipsService: TownshipsService,
    protected regionsService: RegionsService,
    private citiesService: CitiesService,
    private addressesService: AddressesService,
    private addressTypesService: AddressTypesService,
    private store: Store<fromCheckout.State>,
    private authStore: Store<fromAuth.State>,
    private fb: FormBuilder
  ) {
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));
    // this.addressTypes$ = store.pipe(select(fromCheckout.getAddressTypeFetched));
  }

  ngOnInit(): void {
    // this.store.dispatch(AddressTypeActions.fetchAddressTypes());
    this.isSaving = false;
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ addresses }) => {
      this.addresses = addresses;

      if (!this.addresses.id) {
        const today = moment().startOf('day');
        this.addresses.validFrom = today;
        this.addresses.validTo = today;
      }

      this.updateForm(addresses);

      this.regionsService
        .query()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: HttpResponse<IRegions[]>) => {
          this.regions = res.body || [];
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
    });

    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.customer = item;

      if (this.customer) {
        this.store.dispatch(AddressActions.fetchAddresses({ query: { 'customerId.equals': this.customer.id } }));
        this.editForm.patchValue({ customerId: this.customer.id });
      }
    });
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;

    for (const i in this.editForm.controls) {
      this.editForm.controls[i].markAsDirty();
      this.editForm.controls[i].updateValueAndValidity();
    }

    const saveAddresses = this.createFromForm();

    if (saveAddresses.id !== undefined) {
      this.subscribeToSaveResponse(this.addressesService.updateExtend(saveAddresses, true));
    } else {
      this.subscribeToSaveResponse(this.addressesService.createExtend(saveAddresses, true));
    }
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res: HttpResponse<any>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onSaveError(res)
    );
  }

  protected onSaveSuccess(res: any): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(res: any): void {
    this.isSaving = false;
  }

  protected onError(errorMessage: string): void {
    this.jhiAlertService.error(errorMessage, null, null);
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
