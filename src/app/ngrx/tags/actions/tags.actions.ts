import { createAction, props } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
import { IProductTags } from '@root/models';

export const search = createAction(
    '[Find Tags] Search Tags',
    props<{ query: string }>()
);

export const searchSuccess = createAction(
    '[Find Tags] Search Success',
    props<{ tags: IProductTags[] }>()
);

export const searchFailure = createAction(
    '[Find Tags] Search Failure',
    props<{ errorMsg: string }>()
);
