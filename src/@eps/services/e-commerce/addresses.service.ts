import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IAddresses } from '@eps/models';

type EntityResponseType = HttpResponse<IAddresses>;
type EntityArrayResponseType = HttpResponse<IAddresses[]>;

@Injectable({ providedIn: 'root' })
export class AddressesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/addresses';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/addresses-extend';

  constructor(protected http: HttpClient) {}

  create(addresses: IAddresses, isShipping: boolean): Observable<EntityResponseType> {
    console.log('create address', addresses);
    let params = new HttpParams();
    params = params.set('isShipping', isShipping.toString());
    return this.http.post<IAddresses>(this.extendUrl, addresses, { params, observe: 'response' });
  }

  update(addresses: IAddresses, isShipping: boolean): Observable<EntityResponseType> {
    let params = new HttpParams();
    params = params.set('isShipping', isShipping.toString());
    return this.http.put<IAddresses>(this.extendUrl, addresses, { params, observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAddresses>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAddresses[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  setDefault(query: any): Observable<EntityResponseType> {
    let params = new HttpParams();
    params = params.set('addressId', query.addressId);
    params = params.set('isShipping', query.isShippingAddress);
    return this.http.post(this.extendUrl + '/default', params, { observe: 'response' });
  }

  fetch(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAddresses[]>(this.extendUrl + '/fetch', { params: options, observe: 'response' });
  }

  clearDefault(): Observable<EntityResponseType> {
    return this.http.post(this.extendUrl + '/clear', null, { observe: 'response' });
  }
}
