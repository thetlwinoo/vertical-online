import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Orders, IOrders } from '@eps/models';
import { SERVER_API_URL } from '@eps/constants';
import { DATE_FORMAT } from '@eps/constants';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { createRequestOption } from '@eps/utils';

type EntityResponseType = HttpResponse<IOrders>;
type EntityArrayResponseType = HttpResponse<IOrders[]>;

@Injectable()
export class OrderService {
  resourceUrl: string = SERVER_API_URL + 'services/vscommerce/api/orders';
  extendUrl: string = SERVER_API_URL + 'services/vscommerce/api/orders-extend';
  private pageSize = 3;

  constructor(private http: HttpClient) {}

  getAllOrdersCount() {
    return this.http.get<number>(this.extendUrl + '/order/count');
  }

  getOrder(id: number) {
    return this.http
      .get<Orders>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getAllOrders(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.http.get<Orders[]>(this.extendUrl + '/order', {
      params,
    });
  }

  getAllOrdersWithoutPaging(): Observable<EntityArrayResponseType> {
    return this.http.get<Orders[]>(this.extendUrl + '/allorders', { observe: 'response' });
  }

  postOrder(orders: IOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orders);
    return this.http
      .post<IOrders>(this.extendUrl + '/order', copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getPageSize() {
    return this.pageSize;
  }

  create(orders: IOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orders);
    return this.http
      .post<IOrders>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(orders: IOrders): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orders);
    return this.http
      .put<IOrders>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrders>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrders[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orders: IOrders): IOrders {
    const copy: IOrders = Object.assign({}, orders, {
      orderDate: orders.orderDate && orders.orderDate.isValid() ? orders.orderDate.toJSON() : undefined,
      lastEditedWhen: orders.lastEditedWhen && orders.lastEditedWhen.isValid() ? orders.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.orderDate = res.body.orderDate ? moment(res.body.orderDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((orders: IOrders) => {
        orders.orderDate = orders.orderDate ? moment(orders.orderDate) : undefined;
        orders.lastEditedWhen = orders.lastEditedWhen ? moment(orders.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
