import { createAction, props } from '@ngrx/store';

import { IReviewLines } from '@eps/models';

export const fetchReviewLines = createAction('[ReviewLines/API] Fetch ReviewLines', props<{ id: number }>());

export const fetchReviewLinesSuccess = createAction(
  '[ReviewLines/API] Fetch ReviewLines Success',
  props<{ reviewLines: IReviewLines[] }>()
);

export const saveReviewLine = createAction('[ReviewLines/API] Save ReviewLine', props<{ reviewLine: IReviewLines }>());

export const saveReviewLineSuccess = createAction('[ReviewLines/API] Save ReviewLine Success', props<{ reviewLines: IReviewLines }>());

export const reviewLineError = createAction('[ReviewLines/API] ReviewLine Error', props<{ errorMsg: string }>());
