import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '@vertical/constants';
import { createRequestOption } from '@vertical/utils';
import { IAddresses } from '@vertical/models';

type EntityResponseType = HttpResponse<IAddresses>;
type EntityArrayResponseType = HttpResponse<IAddresses[]>;

@Injectable({ providedIn: 'root' })
export class AddressesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/addresses';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/addresses-extend';

  constructor(protected http: HttpClient) {}

  create(addresses: IAddresses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(addresses);
    return this.http
      .post<IAddresses>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createExtend(addresses: IAddresses, isShipping: boolean): Observable<EntityResponseType> {
    console.log('create address', addresses);
    let params = new HttpParams();
    params = params.set('isShipping', isShipping.toString());
    return this.http.post<IAddresses>(this.extendUrl, addresses, { params, observe: 'response' });
  }

  update(addresses: IAddresses): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(addresses);
    return this.http
      .put<IAddresses>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateExtend(addresses: IAddresses, isShipping: boolean): Observable<EntityResponseType> {
    let params = new HttpParams();
    params = params.set('isShipping', isShipping.toString());
    return this.http.put<IAddresses>(this.extendUrl, addresses, { params, observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAddresses>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAddresses[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(addresses: IAddresses): IAddresses {
    const copy: IAddresses = Object.assign({}, addresses, {
      validFrom: addresses.validFrom && addresses.validFrom.isValid() ? addresses.validFrom.toJSON() : undefined,
      validTo: addresses.validTo && addresses.validTo.isValid() ? addresses.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((addresses: IAddresses) => {
        addresses.validFrom = addresses.validFrom ? moment(addresses.validFrom) : undefined;
        addresses.validTo = addresses.validTo ? moment(addresses.validTo) : undefined;
      });
    }
    return res;
  }
}
