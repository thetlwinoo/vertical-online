import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootSharedModule } from '@vertical/shared.module';

import { MyAddressesComponent, AddressesUpdateComponent, addressesRoute } from './';

const ENTITY_STATES = [...addressesRoute];

const COMPONENTS = [MyAddressesComponent, AddressesUpdateComponent];

@NgModule({
  imports: [RootSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [...COMPONENTS],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyAddressesModule {}
