import { createAction, props } from '@ngrx/store';

import { ICustomers } from '@vertical/models';

export const fetchCustomer = createAction('[Customer/API] Fetch Customer', props<{ query: any }>());

export const fetchCustomerSuccess = createAction('[Customer/API] Fetch Customer Success', props<{ customer: ICustomers }>());

export const createCustomerAccount = createAction('[Customer/API] Create Customer Account');

export const createCustomerAccountSuccess = createAction(
  '[Customer/API]  Create Customer Account Success',
  props<{ customer: ICustomers }>()
);

export const customerError = createAction('[Customer/API] Customer Error', props<{ errorMsg: string }>());
