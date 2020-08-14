import { createAction, props } from '@ngrx/store';

import { IPeople } from '@vertical/models';

export const fetchLoginPeople = createAction('[People/API] Fetch Login People', props<{ query: any }>());

export const fetchLoginPeopleSuccess = createAction('[People/API] Fetch Login People Success', props<{ people: IPeople }>());

export const saveProfile = createAction('[People/API] Save Profile', props<{ people: IPeople }>());

export const saveProfileSuccess = createAction('[People/API] Save Profile Success', props<{ people: IPeople }>());

export const peopleError = createAction('[People/API] People Error', props<{ errorMsg: string }>());
