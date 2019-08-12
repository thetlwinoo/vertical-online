import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as PhotoActions from "./photo.actions";
import { ProductPhotoService } from '@root/services';
import { of } from "rxjs";

@Injectable()
export class PhotoEffects {
    @Effect()
    fetchPhotos = this.actions$.pipe(
        ofType(PhotoActions.FETCH_PHOTOS),
        map((action: PhotoActions.FetchPhotos) => {
            return action.payload;
        }),
        switchMap((params: number) => {
            return this.productPhotoService.getProductPhotos(params)
                .map(res => {
                    console.log('PHotos', res);
                    return {
                        type: PhotoActions.FETCH_PHOTOS_SUCCESS,
                        payload: { photos: res, effect: PhotoActions.FETCH_PHOTOS }
                    }
                }).catch(error => {
                    return of(
                        new PhotoActions.PhotoError(
                            { error: error, errorEffect: PhotoActions.FETCH_PHOTOS }));
                })
        })
    )

    constructor(private actions$: Actions, private productPhotoService: ProductPhotoService) {
    }
}

