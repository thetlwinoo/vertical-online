import { createAction, props } from '@ngrx/store';

import { IAddressTypes } from '@eps/models';

export const fetchAddressTypes = createAction('[Address Type/API] Fetch Address Types');

export const fetchAddressTypesSuccess = createAction(
  '[Address Type/API] Fetch Address Types Success',
  props<{ addressTypes: IAddressTypes[] }>()
);

export const addressTypeError = createAction('[Address Type/API] Address Type Error', props<{ errorMsg: string }>());
