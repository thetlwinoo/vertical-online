import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BusinessEntityAddress,
  IAddressTypes,
  Addresses,
  AddressTypes,
  IPeople,
  IZone,
  IAddresses,
  ICountries,
  ICities,
} from '@eps/models';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { AddressTypeActions } from 'app/ngrx/checkout/actions';

// import * as AddressesActions from "app/store/adresses/addresses.actions";
import { AddressesService, AddressTypesService, ZoneService, CountriesService, CitiesService } from '@eps/services';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

type SelectableEntity = IZone | IAddressTypes | IPeople;

@Component({
  selector: 'app-addresses-update',
  templateUrl: './addresses-update.component.html',
  styleUrls: ['./addresses-update.component.scss'],
})
export class AddressesUpdateComponent implements OnInit, OnDestroy {
  addresses: any;
  addressTypes$: Observable<IAddressTypes[]>;
  personPhone: any;
  personEmailAddress: any;
  isSaving: boolean;
  selectedAddressType: IAddressTypes;
  activatedRouteSubscription: Subscription;
  addresstypes: IAddressTypes[];
  zones: IZone[];
  countries: ICountries[] = [];
  cities: ICities[] = [];

  editForm = this.fb.group({
    id: [],
    contactPerson: [null, [Validators.required]],
    contactNumber: [null, [Validators.required]],
    contactEmailAddress: [null, [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    addressLine1: [null, [Validators.required]],
    addressLine2: [],
    city: [],
    postalCode: [],
    defaultInd: [],
    activeInd: [],
    countryId: [],
    cityId: [],
    zoneId: [],
    addressTypeId: [],
    personId: [],
  });

  selectedCountryId: number;
  selectedCityId: number;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected zoneService: ZoneService,
    private countriesService: CountriesService,
    private citiesService: CitiesService,
    private addressesService: AddressesService,
    private addressTypesService: AddressTypesService,
    private store: Store<fromCheckout.State>,
    private fb: FormBuilder
  ) {
    // this.addressTypes$ = store.pipe(select(fromCheckout.getAddressTypeFetched));
  }

  ngOnInit(): void {
    // this.store.dispatch(AddressTypeActions.fetchAddressTypes());
    this.isSaving = false;
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ addresses }) => {
      this.addresses = addresses;
      this.updateForm(addresses);
    });

    this.countriesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<ICountries[]>) => {
        this.countries = res.body || [];
        this.selectedCountryId = res.body.filter(country => country.name === 'Myanmar')[0].id;

        this.editForm.patchValue({ countryId: this.selectedCountryId });
      });

    this.citiesService
      .query()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: HttpResponse<ICities[]>) => (this.cities = res.body || []));

    this.zoneService.query().subscribe((res: HttpResponse<IZone[]>) => {
      this.zones = res.body || [];

      if (this.addresses.zoneId) {
        this.selectedCityId = res.body.filter(zone => zone.id === this.addresses.zoneId)[0].cityId;
        this.editForm.patchValue({ cityId: this.selectedCityId });
      }
    });

    this.addressTypesService.query().subscribe((res: HttpResponse<IAddressTypes[]>) => (this.addresstypes = res.body || []));
  }

  updateForm(addresses: IAddresses): void {
    this.editForm.patchValue({
      id: addresses.id,
      contactPerson: addresses.contactPerson,
      contactNumber: addresses.contactNumber,
      contactEmailAddress: addresses.contactEmailAddress,
      addressLine1: addresses.addressLine1,
      addressLine2: addresses.addressLine2,
      city: addresses.city,
      postalCode: addresses.postalCode,
      defaultInd: addresses.id === undefined ? true : addresses.defaultInd,
      activeInd: true,
      countryId: null,
      cityId: null,
      zoneId: addresses.zoneId,
      addressTypeId: addresses.addressTypeId,
      personId: addresses.personId,
    });

    if (addresses.id === undefined) {
      this.editForm.get('defaultInd').disable();
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const addresses = this.createFromForm();

    if (addresses.id !== undefined) {
      this.subscribeToSaveResponse(this.addressesService.update(addresses, true));
    } else {
      this.subscribeToSaveResponse(this.addressesService.create(addresses, true));
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
      // tslint:disable-next-line: no-non-null-assertion
      id: this.editForm.get(['id'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      contactPerson: this.editForm.get(['contactPerson'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      contactNumber: this.editForm.get(['contactNumber'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      contactEmailAddress: this.editForm.get(['contactEmailAddress'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      addressLine1: this.editForm.get(['addressLine1'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      addressLine2: this.editForm.get(['addressLine2'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      city: this.editForm.get(['city'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      postalCode: this.editForm.get(['postalCode'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      defaultInd: this.editForm.get(['defaultInd'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      activeInd: this.editForm.get(['activeInd'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      zoneId: this.editForm.get(['zoneId'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      addressTypeId: this.editForm.get(['addressTypeId'])!.value,
      // tslint:disable-next-line: no-non-null-assertion
      personId: this.editForm.get(['personId'])!.value,
    };
  }
}
