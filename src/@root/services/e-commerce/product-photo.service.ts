import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Products,IProducts } from "@root/models";
import { SERVER_API_URL } from '@root/constants';
import { createRequestOption } from '@root/utils';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class ProductPhotoService {
    resourceUrl: string = SERVER_API_URL + 'api/product-photos';
    extendUrl: string = SERVER_API_URL + 'api/product-photo-extend';

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        console.log('options', this.resourceUrl, options)
        return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    getProductPhotos(id: number) {
        return this.http.get<any[]>(this.extendUrl + '/photos',
            {
                params: new HttpParams().set('id', id.toString())
            });
    }

}