import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { DisplayCartComponent } from './display-cart/display-cart.component';
import { EmptyCartComponent } from './display-cart/empty-cart/empty-cart.component';
import { InterestedComponent } from './display-cart/interested/interested.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { CheckoutGuardService } from "app/core/e-commerce/_services";
import { RootSharedModule } from '@root/shared.module';
import { CoreModule } from 'app/core/core.module';
import { MessageService, PaypalService } from 'app/core/e-commerce/_services';
import { DefaultAddressPipe } from './default-address.pipe';
import { AddressTypePipe } from './addresses/pipes/address-type.pipe';
import { AddressComponent } from './addresses/address/address.component';
import { NewAddressComponent } from './addresses/new-address/new-address.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    DisplayCartComponent,
    EmptyCartComponent,
    InterestedComponent,
    OrderFormComponent,
    PaymentComponent,
    SuccessComponent,
    DefaultAddressPipe,
    AddressTypePipe,
    AddressComponent,
    NewAddressComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    RootSharedModule,
    CoreModule
  ],
  providers: [
    CheckoutGuardService,
    MessageService,
    PaypalService
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutModule { }
