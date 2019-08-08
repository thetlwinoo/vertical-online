import { Action } from '@ngrx/store';
import { HttpError } from "../app.reducers";

export const FETCH_PHOTOS = 'FETCH_PHOTOS';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const PHOTO_ERROR = 'PHOTO_ERROR';

export class FetchPhotos implements Action {
    readonly type = FETCH_PHOTOS;

    constructor(public payload: number) {
    }
}

export class FetchPhotosSuccess implements Action {
    readonly type = FETCH_PHOTOS_SUCCESS;

    constructor(public payload: { photos: any, effect: string }) {
    }
}

export class PhotoError implements Action {
    readonly type = PHOTO_ERROR;

    constructor(public payload: HttpError) {
    }
}

export type PhotoActions = FetchPhotos | FetchPhotosSuccess
