import { createReducer, on } from '@ngrx/store';

import {
    PeopleActions
} from 'app/ngrx/auth/actions';
import { IPeople } from '@epm/models';

export const peopleFeatureKey = 'people';

export interface State {
    loaded: boolean;
    loading: boolean;
    people: IPeople;
    error: string;
}

const initialState: State = {
    loaded: false,
    loading: false,
    people: null,
    error: ''
};

export const reducer = createReducer(
    initialState,
    on(PeopleActions.fetchLoginPeople, state => ({
        ...state,
        loading: true,
    })),
    on(PeopleActions.fetchLoginPeopleSuccess, (state, { people }) => ({
        loaded: true,
        loading: false,
        people: people,
        error: ''
    })),
    on(PeopleActions.peopleError, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg
    }))
)

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getPeople = (state: State) => state.people;

export const getError = (state: State) => state.error;
