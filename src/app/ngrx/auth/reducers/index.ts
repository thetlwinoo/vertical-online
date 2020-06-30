import { IPeople } from '@eps/models';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import * as fromPeople from 'app/ngrx/auth/reducers/people.reducer';
import * as fromCustomer from 'app/ngrx/auth/reducers/customer.reducer';
import * as fromRoot from 'app/ngrx';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromPeople.peopleFeatureKey]: fromPeople.State;
  [fromCustomer.customerFeatureKey]: fromCustomer.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromPeople.peopleFeatureKey]: fromPeople.reducer,
    [fromCustomer.customerFeatureKey]: fromCustomer.reducer,
  })(state, action);
}

export const getAuthState = createFeatureSelector<State, AuthState>(authFeatureKey);

// People State
export const getPeopleState = createSelector(getAuthState, (state: AuthState) => state.people);

export const getPeopleError = createSelector(getPeopleState, fromPeople.getError);

export const getPeopleFetched = createSelector(getPeopleState, fromPeople.getPeople);

export const getPeopleLoading = createSelector(getPeopleState, fromPeople.getLoading);

export const getPeopleLoaded = createSelector(getPeopleState, fromPeople.getLoaded);

// Customer State
export const getCustomerState = createSelector(getAuthState, (state: AuthState) => state.customer);

export const getCustomerError = createSelector(getCustomerState, fromCustomer.getError);

export const getCustomerFetched = createSelector(getCustomerState, fromCustomer.getCustomer);

export const getCustomerLoading = createSelector(getCustomerState, fromCustomer.getLoading);

export const getCustomerLoaded = createSelector(getCustomerState, fromCustomer.getLoaded);
