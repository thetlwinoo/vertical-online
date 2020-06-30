import { IProductTags } from '@eps/models';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
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

export const getTagsState = createFeatureSelector<State, TagsState>(tagsFeatureKey);

export const getTagEntitiesState = createSelector(getTagsState, state => state.tags);

export const {
  selectIds: getTagIds,
  selectEntities: getTagEntities,
  selectAll: getAllTags,
  selectTotal: getTotalTags,
} = fromTags.adapter.getSelectors(getTagEntitiesState);

export const getSearchState = createSelector(getTagsState, (state: TagsState) => state.search);

export const getSearchTagIds = createSelector(getSearchState, fromSearch.getIds);

export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);

export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

export const getSearchError = createSelector(getSearchState, fromSearch.getError);

export const getSearchResults = createSelector(getTagEntitiesState, getSearchTagIds, (tags, searchIds) =>
  searchIds.map(id => tags[id]).filter((tag): tag is IProductTags => tag != null)
);

// Fetch State
export const getFetchState = createSelector(getTagsState, (state: TagsState) => state.fetch);

export const getFetchError = createSelector(getFetchState, fromFetch.getError);

export const getFetchLoading = createSelector(getFetchState, fromFetch.getLoading);

export const getFetchCategories = createSelector(getFetchState, fromFetch.getCategories);

export const getFetchSelectedCategoryId = createSelector(getFetchState, fromFetch.getSelectedCategoryId);

export const getSelectedCategory = createSelector(getFetchCategories, getFetchSelectedCategoryId, (entities, id) =>
  // return entities.filter(item => item.productCategoryId == id).map(item=> item.productCategoryProductCategoryName);
  [...new Set(entities.filter(item => item.id === id).map(item => item.name))]
);

export const getCategoriesIds = createSelector(getFetchCategories, entities => entities.map(item => item.id));

export const getCategoriesTree = createSelector(getFetchCategories, entities => {
  const categories = [];
  const map = new Map();

  for (const item of entities) {
    if (!map.has(item.parentId)) {
      map.set(item.parentId, true);
      categories.push({
        id: item.id,
        title: item.parentName,
        key: item.parentId,
        expandedIcon: 'fa fa-folder-open',
        expanded: true,
        children: [],
      });
    }
  }

  for (const category of categories) {
    entities.map(item => {
      if (category.id === item.id) {
        category.children.push({
          id: item.id,
          title: item.name,
          key: item.id,
          isLeaf: true,
          icon: 'fa fa-file-word-o',
          status: 'A',
        });
      }
    });
  }

  return categories;
});

export const getFetchColors = createSelector(getFetchState, fromFetch.getColors);

export const getFetchBrands = createSelector(getFetchState, fromFetch.getBrands);

export const getFetchPriceRange = createSelector(getFetchState, fromFetch.getPriceRange);
