import * as CompareActions from './compare.actions';
import { Compares } from '@root/models';
import { HttpError } from "../app.reducers";
import { filter, map } from 'rxjs/operators';

export interface State {
    isInCompare: boolean;
    compares: Compares;
    errors: HttpError[];
    loading: boolean;
    fetchLoading: boolean;
}

const initialState: State = {
    isInCompare: false,
    compares: null,
    errors: [],
    loading: false,
    fetchLoading: false
};

export function compareReducer(state = initialState, action: CompareActions.CompareActions) {
    switch (action.type) {
        case (CompareActions.FETCH_COMPARE):
            return {
                ...state,
                fetchLoading: true
            };

        case (CompareActions.FETCH_COMPARE_SUCCESS):
            let fetchErrorClear = state.errors;
            for (let i = 0; i < fetchErrorClear.length; i++) {
                if (fetchErrorClear[i].errorEffect === action.payload.effect) {
                    fetchErrorClear = fetchErrorClear.splice(i, 1);
                }
            }

            if (action.payload.compare == null || action.payload.compare == undefined) {
                return {
                    ...state,
                    compares: null,
                    errors: fetchErrorClear,
                    loading: state.loading,
                    fetchLoading: false
                }
            }

            console.log('fetch compare',action.payload)
            return {
                ...state,
                compares: action.payload.compare,
                errors: fetchErrorClear,
                loading: state.loading,
                fetchLoading: false
            };

        case (CompareActions.CHECK_IN_COMPARE_SUCCESS):
            let checkErrorClear = state.errors;
            for (let i = 0; i < checkErrorClear.length; i++) {
                if (checkErrorClear[i].errorEffect === action.payload.effect) {
                    checkErrorClear = checkErrorClear.splice(i, 1);
                }
            }

            console.log('check in compare',action.payload)
            return {
                ...state,
                isInCompare: action.payload.isInCompare,
                errors: checkErrorClear,
                loading: false,
            };

        case (CompareActions.ADD_TO_COMPARE):
        case (CompareActions.CHECK_IN_COMPARE):
        case (CompareActions.REMOVE_FROM_COMPARE):
            return {
                ...state,
                loading: true
            };

        case (CompareActions.SET_COMPARE):
            let compareErrorClear = state.errors;
            for (let i = 0; i < compareErrorClear.length; i++) {
                if (compareErrorClear[i].errorEffect === action.payload.effect) {
                    compareErrorClear = compareErrorClear.splice(i, 1);
                }
            }

            if (action.payload.compare == null || action.payload.compare == undefined) {
                return {
                    ...state,
                    compares: null,
                    errors: compareErrorClear,
                    loading: false,
                    fetchLoading: state.fetchLoading
                }
            }

            console.log('Actions Success', action.payload.compare.compareLists);

            let _IsInCompare: boolean = (action.payload.effect == CompareActions.ADD_TO_COMPARE);

            return {
                ...state,
                isInCompare: _IsInCompare,
                compares: action.payload.compare,
                errors: compareErrorClear,
                loading: false,
                fetchLoading: state.fetchLoading
            };

        case (CompareActions.COMPARE_ERROR):
            let compareErrorPush = state.errors;
            for (let i = 0; i < compareErrorPush.length; i++) {
                if (compareErrorPush[i].errorEffect === action.payload.errorEffect) {
                    compareErrorPush[i] = action.payload;
                    return {
                        ...state,
                        errors: compareErrorPush,
                        loading: false
                    };
                }
            }
            compareErrorPush.push(action.payload);
            return {
                ...state,
                errors: compareErrorPush,
                loading: false
            };

        case (CompareActions.EMPTY_COMPARE_SUCCESS):
            return initialState;

        default:
            return state;
    }
}
