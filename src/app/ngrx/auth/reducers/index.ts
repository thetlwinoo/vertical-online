import { IPeople } from '@epm/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromPeople from 'app/ngrx/auth/reducers/people.reducer';
import * as fromRoot from 'app/ngrx';

export const authFeatureKey = 'auth';

export interface AuthState {
    [fromPeople.peopleFeatureKey]: fromPeople.State;
}

export interface State extends fromRoot.State {
    [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
    return combineReducers({
        [fromPeople.peopleFeatureKey]: fromPeople.reducer
    })(state, action);
}

export const getAuthState = createFeatureSelector<State, AuthState>(
    authFeatureKey
);

//People State
export const getPeopleState = createSelector(
    getAuthState,
    (state: AuthState) => state.people
);

export const getPeopleError = createSelector(
    getPeopleState,
    fromPeople.getError
);

export const getPeopleFetched = createSelector(
    getPeopleState,
    fromPeople.getPeople
);

export const getPeopleLoading = createSelector(
    getPeopleState,
    fromPeople.getLoading
);

export const getPeopleLoaded = createSelector(
    getPeopleState,
    fromPeople.getLoaded
);