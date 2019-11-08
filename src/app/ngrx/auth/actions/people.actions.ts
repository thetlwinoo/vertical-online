import { createAction, props } from '@ngrx/store';

import { IPeople } from '@epm/models';

export const fetchLoginPeople = createAction(
    '[People/API] Fetch Login People',
    props<{ people: IPeople }>()
);

export const fetchLoginPeopleSuccess = createAction(
    '[People/API] Fetch Login People Success',
    props<{ people: IPeople }>()
);

export const peopleError = createAction(
    '[People/API] People Error',
    props<{ errorMsg: string }>()
);