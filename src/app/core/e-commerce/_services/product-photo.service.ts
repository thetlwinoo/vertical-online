import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Products,IProducts } from "../_models";
import { environment } from '@app/env';
import { createRequestOption } from '@root/utils';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class ProductPhotoService {
    url: string = `${environment.serverApi.baseUrl}` + 'api/product-photos';
    extendUrl: string = `${environment.serverApi.baseUrl}` + 'api/product-photo-extend';

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        console.log('options', this.url, options)
        return this.http.get<any[]>(this.url, { params: options, observe: 'response' });
    }

    getProductPhotos(id: number) {
        return this.http.get<any[]>(this.extendUrl + '/photos',
            {
                params: new HttpParams().set('id', id.toString())
            });
    }

}