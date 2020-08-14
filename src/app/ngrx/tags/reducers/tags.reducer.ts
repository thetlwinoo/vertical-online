import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { TagsActions } from 'app/ngrx/tags/actions';
import { IProductTags } from '@vertical/models';

export const tagsFeatureKey = 'tags';

export interface State extends EntityState<IProductTags> { }

export const adapter: EntityAdapter<IProductTags> = createEntityAdapter<IProductTags>({
    selectId: (tag: IProductTags) => tag.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
    initialState,
    on(
        TagsActions.searchSuccess,
        (state, { tags }) => adapter.addMany(tags, state)
    )
);