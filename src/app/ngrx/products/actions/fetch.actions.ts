import { createAction, props } from '@ngrx/store';

import { IProducts, IReviewLines, IProductPhoto } from '@root/models';

//newly added
export const fetchNewlyAdded = createAction('[Products/API] Fetch Newly Added');

export const fetchNewlyAddedSuccess = createAction(
    '[Products/API] Fetch Newly Added Success',
    props<{ newlyAdded: IProducts[] }>()
);

//most selling
export const fetchMostSelling = createAction('[Products/API] Fetch Most Selling');

export const fetchMostSellingSuccess = createAction(
    '[Products/API] Fetch Most Selling Success',
    props<{ mostSelling: IProducts[] }>()
);

//interested
export const fetchInterested = createAction('[Products/API] Fetch Interested');

export const fetchInterestedSuccess = createAction(
    '[Products/API] Fetch Interested Success',
    props<{ interested: IProducts[] }>()
);

//daily discover
export const fetchDailyDiscover = createAction('[Products/API] Fetch Daily Discover');

export const fetchDailyDiscoverSuccess = createAction(
    '[Products/API] Fetch Daily Discover Success',
    props<{ dailyDiscover: IProducts[] }>()
);

export const fetchRelated = createAction(
    '[Products/API] Fetch Related Product',
    props<{ id: number }>()
);

export const fetchReviewLines = createAction(
    '[Products/API] Fetch Review Lines',
    props<{ id: number }>()
);

export const fetchRelatedSuccess = createAction(
    '[Products/API] Fetch Related Success',
    props<{ related: IProducts[] }>()
);

export const fetchReviewLinesSuccess = createAction(
    '[Products/API] Fetch Review Lines Success',
    props<{ reviewLines: IReviewLines[] }>()
);

export const fetchProductPhoto = createAction(
    '[Products/API] Fetch Product Photo',
    props<{ id: number }>()
);

export const fetchProductPhotoSucess = createAction(
    '[Products/API] Fetch Product Photo Success',
    props<{ photos: IProductPhoto[] }>()
);

export const fetchFailure = createAction(
    '[Products/API] Fetch Failure',
    props<{ errorMsg: string }>()
);