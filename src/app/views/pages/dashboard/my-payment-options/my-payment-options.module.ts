import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@eps/shared.module';

import {
  MyPaymentOptionsComponent,
  myPaymentOptionsRoute
} from './';

const ENTITY_STATES = [...myPaymentOptionsRoute];

@NgModule({
  declarations: [MyPaymentOptionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ENTITY_STATES),
    RootSharedModule
  ]
})
export class MyPaymentOptionsModule { }
