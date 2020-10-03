import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@vertical/constants';
import { createRequestOption } from '@vertical/utils';
import { IWebImages } from '@vertical/models';

type EntityResponseType = HttpResponse<IWebImages>;
type EntityArrayResponseType = HttpResponse<IWebImages[]>;

@Injectable({ providedIn: 'root' })
export class WebImagesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/web-images';

  constructor(protected http: HttpClient) {}

  create(webImages: IWebImages): Observable<EntityResponseType> {
    return this.http.post<IWebImages>(this.resourceUrl, webImages, { observe: 'response' });
  }

  update(webImages: IWebImages): Observable<EntityResponseType> {
    return this.http.put<IWebImages>(this.resourceUrl, webImages, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWebImages>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWebImages[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
