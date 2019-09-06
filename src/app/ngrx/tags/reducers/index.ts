import { IProductTags } from '@root/models';
import {
    createSelector,
    createFeatureSelector,
    combineReducers,
    Action,
} from '@ngrx/store';
import * as fromRoot from 'app/ngrx';
import * as fromSearch from 'app/ngrx/tags/reducers/search.reducer';
import * as fromFetch from 'app/ngrx/tags/reducers/fetch.reducer';
import * as fromTags from 'app/ngrx/tags/reducers/tags.reducer';

export const tagsFeatureKey = 'tags';

export interface TagsState {
    [fromSearch.searchFeatureKey]: fromSearch.State;
    [fromTags.tagsFeatureKey]: fromTags.State;
    [fromFetch.fetchFeatureKey]: fromFetch.State;
}

export interface State extends fromRoot.State {
    [tagsFeatureKey]: TagsState;
}

export function reducers(state: TagsState | undefined, action: Action) {
    return combineReducers({
        [fromSearch.searchFeatureKey]: fromSearch.reducer,
        [fromTags.tagsFeatureKey]: fromTags.reducer,
        [fromFetch.fetchFeatureKey]: fromFetch.reducer,
    })(state, action);
}

export const getTagsState = createFeatureSelector<State, TagsState>(
    tagsFeatureKey
);

export const getTagEntitiesState = createSelector(
    getTagsState,
    state => state.tags
);

export const {
    selectIds: getTagIds,
    selectEntities: getTagEntities,
    selectAll: getAllTags,
    selectTotal: getTotalTags,
} = fromTags.adapter.getSelectors(getTagEntitiesState);


export const getSearchState = createSelector(
    getTagsState,
    (state: TagsState) => state.search
);

export const getSearchTagIds = createSelector(
    getSearchState,
    fromSearch.getIds
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);

export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);

export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
);

export const getSearchResults = createSelector(
    getTagEntitiesState,
    getSearchTagIds,
    (tags, searchIds) => {
        return searchIds
            .map(id => tags[id])
            .filter((tag): tag is IProductTags => tag != null);
    }
);

//Fetch State
export const getFetchState = createSelector(
    getTagsState,
    (state: TagsState) => state.fetch
);

export const getFetchError = createSelector(
    getFetchState,
    fromFetch.getError
);

export const getFetchLoading = createSelector(
    getFetchState,
    fromFetch.getLoading
);

export const getFetchSubCategories = createSelector(
    getFetchState,
    fromFetch.getSubCategories
);

export const getFetchSelectedCategoryId = createSelector(
    getFetchState,
    fromFetch.getSelectedCategoryId
);

export const getSelectedCategory = createSelector(
    getFetchSubCategories,
    getFetchSelectedCategoryId,
    (entities, id) => {
        // return entities.filter(item => item.productCategoryId == id).map(item=> item.productCategoryProductCategoryName);
        return [...new Set(entities.filter(item => item.productCategoryId == id).map(item => item.productCategoryProductCategoryName))]
    }
);

export const getSubCategoriesIds = createSelector(
    getFetchSubCategories,
    (entities) => {
        return entities.map(item => item.id);
    }
);

export const getCategoriesTree = createSelector(
    getFetchSubCategories,
    (entities) => {
        console.log('fetched sub cag', entities)
        const categories = [];
        const map = new Map();

        for (const item of entities) {
            if (!map.has(item.productCategoryId)) {
                map.set(item.productCategoryId, true);
                categories.push({
                    id: item.productCategoryId,
                    label: item.productCategoryProductCategoryName,
                    data: item.productCategoryProductCategoryName,
                    type: "collapsable",
                    expandedIcon: "fa fa-folder-open",
                    expanded: true,
                    children: []
                });
            }
        }

        for (const category of categories) {
            entities.map(item => {
                if (category.id == item.productCategoryId) {
                    category.children.push({
                        id: item.id,
                        label: item.productSubCategoryName,
                        data: item.productSubCategoryName,
                        icon: "fa fa-file-word-o",
                        type: "item",
                        status: "A"
                    })
                }
            })
        }

        return categories;
    }
);

export const getFetchColors = createSelector(
    getFetchState,
    fromFetch.getColors
);

export const getFetchBrands = createSelector(
    getFetchState,
    fromFetch.getBrands
);

export const getFetchPriceRange = createSelector(
    getFetchState,
    fromFetch.getPriceRange
);