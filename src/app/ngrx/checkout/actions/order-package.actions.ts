import { createAction, props } from '@ngrx/store';

import { IOrderPackages } from '@vertical/models';
import { ReviewsProps } from '@vertical/models/order-package-actions.model';

export const getOrderPackage = createAction('[Order Packages/API] Get Order Package', props<{ id: number }>());

export const getOrderPackageSuccess = createAction(
  '[Order Packages/API] Get Order Package Success',
  props<{ orderPackage: IOrderPackages }>()
);

export const saveOrderPackage = createAction('[Order Packages/API] Save Order Package', props<{ orderPackage: IOrderPackages }>());

export const saveOrderPackageSuccess = createAction(
  '[Order Packages/API] Save Order Package Success',
  props<{ orderPackage: IOrderPackages }>()
);

export const saveReviews = createAction('[Order Packages/API] Save Reviews', props<{ props: ReviewsProps }>());

export const saveReviewsSuccess = createAction('[Order Packages/API] Save Reviews Success', props<{ orderPackage: IOrderPackages }>());

export const orderPackageError = createAction('[Order Packages/API] Order Package Error', props<{ errorMsg: string }>());
