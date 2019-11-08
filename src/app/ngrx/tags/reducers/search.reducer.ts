import { TagsActions } from 'app/ngrx/tags/actions';
import { createReducer, on } from '@ngrx/store';
import { IProductTags } from '@epm/models';
export const searchFeatureKey = 'search';

export interface State {
    ids: number[];
    loading: boolean;
    error: string;
    query: string;
}

const initialState: State = {
    ids: [],
    loading: false,
    error: '',
    query: ''
};

export const reducer = createReducer(
    initialState,
    on(TagsActions.search, (state, { query }) => {
        return query === ''
            ? {
                ids: [],
                loading: false,
                error: '',
                query
            }
            : {
                ...state,
                loading: true,
                error: '',
                query
            };
    }),
    on(TagsActions.searchSuccess, (state, { tags }) => ({
        ...state,
        ids: tags.map(tag => tag.id),
        loading: false,
        error: '',
        query: state.query
    })),
    on(TagsActions.searchFailure, (state, { errorMsg }) => ({
        ...state,
        loading: false,
        error: errorMsg,
    }))
)

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;