import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Products, IProductPhoto } from '@eps/models';
import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IProductPhoto>;
type EntityArrayResponseType = HttpResponse<IProductPhoto[]>;

@Injectable({ providedIn: 'root' })
export class ProductPhotoService {
  resourceUrl: string = SERVER_API_URL + 'services/vscommerce/api/product-photos';
  extendUrl: string = SERVER_API_URL + 'services/vscommerce/api/product-photos-extend';

  constructor(private http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    console.log('options', this.resourceUrl, options);
    return this.http.get<IProductPhoto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getProductPhotos(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IProductPhoto[]>(this.extendUrl + '/photos', {
      params: new HttpParams().set('id', id.toString()),
      observe: 'response',
    });
  }
}
