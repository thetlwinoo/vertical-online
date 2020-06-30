import { createAction, props } from '@ngrx/store';

import { ICustomers } from '@eps/models';

export const fetchCustomer = createAction('[Customer/API] Fetch Customer', props<{ id: number }>());

export const fetchCustomerSuccess = createAction('[Customer/API] Fetch Customer Success', props<{ customer: ICustomers }>());

export const customerError = createAction('[Customer/API] Customer Error', props<{ errorMsg: string }>());
