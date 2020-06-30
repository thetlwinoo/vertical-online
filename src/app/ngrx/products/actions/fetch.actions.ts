import { createAction, props } from '@ngrx/store';

import { IProducts, IProductCategory, IStockItems, IPhotos, IOrderLines } from '@eps/models';
import { ProductDocument } from '@eps/models/product-document.model';

// newly added
export const fetchNewlyAdded = createAction('[Products/API] Fetch Newly Added');

export const fetchNewlyAddedSuccess = createAction('[Products/API] Fetch Newly Added Success', props<{ newlyAdded: IProducts[] }>());

// most selling
export const fetchMostSelling = createAction('[Products/API] Fetch Most Selling');

export const fetchMostSellingSuccess = createAction('[Products/API] Fetch Most Selling Success', props<{ mostSelling: IProducts[] }>());

// interested
export const fetchInterested = createAction('[Products/API] Fetch Interested');

export const fetchInterestedSuccess = createAction('[Products/API] Fetch Interested Success', props<{ interested: IProducts[] }>());

// daily discover
export const fetchDailyDiscover = createAction('[Products/API] Fetch Daily Discover');

export const fetchDailyDiscoverSuccess = createAction(
  '[Products/API] Fetch Daily Discover Success',
  props<{ dailyDiscover: IProducts[] }>()
);

export const fetchRelated = createAction('[Products/API] Fetch Related Product', props<{ id: number }>());

export const fetchReviewLines = createAction('[Products/API] Fetch Review Lines', props<{ id: number }>());

export const fetchRelatedSuccess = createAction('[Products/API] Fetch Related Success', props<{ products: IProducts[] }>());

export const fetchStockItems = createAction('[Products/API] Fetch Stock Items', props<{ productId: number }>());

export const fetchStockItemsSuccess = createAction('[Products/API] Fetch Stock Items Success', props<{ stockItems: IStockItems[] }>());

export const fetchReviewsDetails = createAction('[Products/API] Fetch Review Details', props<{ productId: number }>());

export const fetchReviewsDetailsSuccess = createAction(
  '[Products/API] Fetch Review Details Success',
  props<{ reviewDetails: IOrderLines[] }>()
);

export const fetchProductDocument = createAction('[Products/API] Fetch Product Document', props<{ productId: number }>());

export const fetchProductDocumentSuccess = createAction(
  '[Products/API] Fetch Product Document Success',
  props<{ productDocument: ProductDocument }>()
);

export const fetchPhotos = createAction('[Products/API] Fetch Photos', props<{ stockItemId: number }>());

export const fetchPhotosSuccess = createAction('[Products/API] Fetch Photos Success', props<{ photos: IPhotos[] }>());

// export const fetchProductPhotoSuccess = createAction('[Products/API] Fetch Product Photo Success', props<{ photos: IProductPhoto[] }>());

export const fetchCategories = createAction('[Products/API] Fetch Categories');

export const fetchCategoriesSuccess = createAction('[Products/API] Fetch Categories Success', props<{ categories: IProductCategory[] }>());

export const fetchCategoriesTree = createAction('[Products/API] Fetch Categories Tree');

export const fetchCategoriesTreeSuccess = createAction(
  '[Products/API] Fetch Categories Tree Success',
  props<{ categoriesTree: IProductCategory[] }>()
);

export const fetchFailure = createAction('[Products/API] Fetch Failure', props<{ errorMsg: string }>());
