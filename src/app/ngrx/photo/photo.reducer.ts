import * as PhotoActions from "./photo.actions";
import { HttpError } from "../app.reducers";

export interface State {
    photos: any[];
    images: any[];
    errors: HttpError[];
    loading: boolean;
}

const initialState: State = {
    photos: [],
    images: [],
    errors: [],
    loading: false
};

export function photoReducer(state = initialState, action: PhotoActions.PhotoActions) {
    switch (action.type) {
        case (PhotoActions.FETCH_PHOTOS):
            return {
                ...state,
                loading: true
            };

        case (PhotoActions.FETCH_PHOTOS_SUCCESS):
            let fetchPhotosErrorClear = state.errors;
            for (let i = 0; i < fetchPhotosErrorClear.length; i++) {
                if (fetchPhotosErrorClear[i].errorEffect === 'FETCH_PHOTOS') {
                    fetchPhotosErrorClear = fetchPhotosErrorClear.splice(i, 1);
                }
            }

            if (action.payload.photos.length == 0) {
                return {
                    ...state,
                    errors: fetchPhotosErrorClear,
                    loading: false
                }
            }

            let images: any[] = [];
            action.payload.photos.map(data => {
                images.push({ source: data.originalPhoto, alt: data.product.productName, title: data.product.productName });
            });
console.log('images',images)
            return {
                photos: action.payload.photos,
                images: images,
                errors: fetchPhotosErrorClear,
                loading: false
            };
        default:
            return state;
    }
}