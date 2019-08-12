import { Action } from '@ngrx/store';
import { HttpError } from "../app.reducers";
import { People } from '@root/models';

export const FETCH_LOGIN_PEOPLE = 'FETCH_LOGIN_PEOPLE';
export const FETCH_LOGIN_PEOPLE_SUCCESS = 'FETCH_LOGIN_PEOPLE_SUCCESS';
export const PEOPLE_ERROR = 'PEOPLE_ERROR';

export class FetchLoginPeople implements Action {
    readonly type = FETCH_LOGIN_PEOPLE;

    constructor(public payload: People) {
    }
}

export class FetchLoginPeopleSuccess implements Action {
    readonly type = FETCH_LOGIN_PEOPLE_SUCCESS;

    constructor(public payload: People) {
    }
}

export class PeopleError implements Action {
    readonly type = PEOPLE_ERROR;

    constructor(public payload: HttpError) {
    }
}

export type PeopleActions = FetchLoginPeople
    | FetchLoginPeopleSuccess
    | PeopleError