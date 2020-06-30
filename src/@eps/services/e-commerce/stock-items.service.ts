import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL, DATE_FORMAT } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IStockItems } from '@eps/models';

type EntityResponseType = HttpResponse<IStockItems>;
type EntityArrayResponseType = HttpResponse<IStockItems[]>;

@Injectable({ providedIn: 'root' })
export class StockItemsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/stock-items';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/stock-items-extend';

  constructor(protected http: HttpClient) {}

  create(stockItems: IStockItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItems);
    return this.http
      .post<IStockItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(stockItems: IStockItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItems);
    return this.http
      .put<IStockItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    console.log('id', id);
    return this.http
      .get<IStockItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStockItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStockItemsByProductId(id: number): Observable<EntityArrayResponseType> {
    return this.http
      .get<IStockItems[]>(`${this.extendUrl}/products/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(stockItems: IStockItems): IStockItems {
    const copy: IStockItems = Object.assign({}, stockItems, {
      sellStartDate: stockItems.sellStartDate != null && stockItems.sellStartDate.isValid() ? stockItems.sellStartDate.toJSON() : null,
      sellEndDate: stockItems.sellEndDate != null && stockItems.sellEndDate.isValid() ? stockItems.sellEndDate.toJSON() : null,
      lastEditedWhen: stockItems.lastEditedWhen != null && stockItems.lastEditedWhen.isValid() ? stockItems.lastEditedWhen.toJSON() : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sellStartDate = res.body.sellStartDate != null ? moment(res.body.sellStartDate) : null;
      res.body.sellEndDate = res.body.sellEndDate != null ? moment(res.body.sellEndDate) : null;
      res.body.lastEditedWhen = res.body.lastEditedWhen != null ? moment(res.body.lastEditedWhen) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stockItems: IStockItems) => {
        stockItems.sellStartDate = stockItems.sellStartDate != null ? moment(stockItems.sellStartDate) : null;
        stockItems.sellEndDate = stockItems.sellEndDate != null ? moment(stockItems.sellEndDate) : null;
        stockItems.lastEditedWhen = stockItems.lastEditedWhen != null ? moment(stockItems.lastEditedWhen) : null;
      });
    }
    return res;
  }
}
