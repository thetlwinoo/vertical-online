import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { ICustomers } from '@eps/models';

type EntityResponseType = HttpResponse<ICustomers>;
type EntityArrayResponseType = HttpResponse<ICustomers[]>;

@Injectable({ providedIn: 'root' })
export class CustomersService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customers';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/customers-extend';

  constructor(protected http: HttpClient) {}

  createCustomersAccount(): Observable<EntityResponseType> {
    return this.http
      .post<ICustomers>(this.extendUrl + '/create-account', null, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(customers: ICustomers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customers);
    return this.http
      .post<ICustomers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customers: ICustomers): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customers);
    return this.http
      .put<ICustomers>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomers>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomers[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customers: ICustomers): ICustomers {
    const copy: ICustomers = Object.assign({}, customers, {
      accountOpenedDate:
        customers.accountOpenedDate && customers.accountOpenedDate.isValid() ? customers.accountOpenedDate.toJSON() : undefined,
      validFrom: customers.validFrom && customers.validFrom.isValid() ? customers.validFrom.toJSON() : undefined,
      validTo: customers.validTo && customers.validTo.isValid() ? customers.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.accountOpenedDate = res.body.accountOpenedDate ? moment(res.body.accountOpenedDate) : undefined;
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((customers: ICustomers) => {
        customers.accountOpenedDate = customers.accountOpenedDate ? moment(customers.accountOpenedDate) : undefined;
        customers.validFrom = customers.validFrom ? moment(customers.validFrom) : undefined;
        customers.validTo = customers.validTo ? moment(customers.validTo) : undefined;
      });
    }
    return res;
  }
}
