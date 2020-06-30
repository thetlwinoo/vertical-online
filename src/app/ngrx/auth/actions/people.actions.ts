import { createAction, props } from '@ngrx/store';

import { IPeople } from '@eps/models';

export const fetchLoginPeople = createAction('[People/API] Fetch Login People', props<{ id: string }>());

export const fetchLoginPeopleSuccess = createAction('[People/API] Fetch Login People Success', props<{ people: IPeople }>());

export const saveProfile = createAction('[People/API] Save Profile', props<{ people: IPeople }>());

export const saveProfileSuccess = createAction('[People/API] Save Profile Success', props<{ people: IPeople }>());

export const peopleError = createAction('[People/API] People Error', props<{ errorMsg: string }>());
