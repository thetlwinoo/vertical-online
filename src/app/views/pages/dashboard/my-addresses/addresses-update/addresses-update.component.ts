import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessEntityAddress, IAddressTypes, Addresses, AddressTypes } from '@root/models';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import * as fromApp from "app/ngrx/app.reducers";
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Store } from "@ngrx/store";
// import * as AddressesActions from "app/store/adresses/addresses.actions";
import { AddressesService } from '@root/services';
import { HttpError } from "app/ngrx/app.reducers";

@Component({
  selector: 'app-addresses-update',
  templateUrl: './addresses-update.component.html',
  styleUrls: ['./addresses-update.component.scss']
})
export class AddressesUpdateComponent implements OnInit, OnDestroy {
  addressState: Observable<{ addresses: any[], errors: HttpError[], loading: boolean }>;
  addresses: any;
  addressType: any;
  personPhone: any;
  personEmailAddress: any;
  isSaving: boolean;
  selectedAddressType: IAddressTypes;
  mandatoryDefault: boolean = false;
  activatedRouteSubscription: Subscription;
  constructor(
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    private addressesService: AddressesService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.isSaving = false;
    // console.log('init')
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(({ addresses }) => {
      this.addresses = addresses;
      if (this.addresses.id == undefined) {
        this.addresses.defaultInd = true;
        this.mandatoryDefault = true;
      }
      console.log('address', this.addresses)
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.addresses.id !== undefined) {
      this.subscribeToSaveResponse(this.addressesService.update(this.addresses));
    } else {
      this.subscribeToSaveResponse(this.addressesService.create(this.addresses));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe((res: HttpResponse<any>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError(res));
  }

  protected onSaveSuccess(res: any) {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(res: any) {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  ngOnDestroy() {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }
}
