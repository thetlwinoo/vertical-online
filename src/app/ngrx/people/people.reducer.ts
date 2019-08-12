import * as PeopleActions from './people.actions';
import { HttpError } from "../app.reducers";
import { People } from '@root/models';

export interface State {
    isPeopleExist: boolean;
    currentPeople: People;
    errors: HttpError[];
    loading: boolean;
}

const initialState: State = {
    isPeopleExist: null,
    currentPeople: null,
    errors: [],
    loading: false
};

export function peopleReducer(state = initialState, action: PeopleActions.PeopleActions) {
    switch (action.type) {
        case (PeopleActions.FETCH_LOGIN_PEOPLE):
            return {
                ...state,
                loading: true
            };

        case (PeopleActions.FETCH_LOGIN_PEOPLE_SUCCESS):
            let peopleErrorClear = state.errors;
            for (let i = 0; i < peopleErrorClear.length; i++) {
                if (peopleErrorClear[i].errorEffect === PeopleActions.FETCH_LOGIN_PEOPLE) {
                    peopleErrorClear = peopleErrorClear.splice(i, 1);
                }
            }
            return {
                ...state,
                isPeopleExist: true,
                currentPeople: action.payload,
                errors: peopleErrorClear,
                loading: false
            };

        case (PeopleActions.PEOPLE_ERROR):
            let peopleErrorPush = state.errors;
            for (let i = 0; i < peopleErrorPush.length; i++) {
                if (peopleErrorPush[i].errorEffect === action.payload.errorEffect) {
                    peopleErrorPush[i] = action.payload;
                    return {
                        ...state,
                        errors: peopleErrorPush,
                        loading: false
                    };
                }
            }
            peopleErrorPush.push(action.payload);
            return {
                ...state,
                errors: peopleErrorPush,
                loading: false
            };
    }
}
