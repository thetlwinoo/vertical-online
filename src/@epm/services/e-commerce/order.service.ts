import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Orders, IOrders } from "@epm/models";
import { SERVER_API_URL } from '@epm/constants';
import { DATE_FORMAT } from '@epm/constants';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { createRequestOption } from '@epm/utils';

type EntityResponseType = HttpResponse<IOrders>;
type EntityArrayResponseType = HttpResponse<IOrders[]>;

@Injectable()
export class OrderService {

  resourceUrl: string = SERVER_API_URL + 'api/orders';
  extendUrl: string = SERVER_API_URL + 'api/orders-extend';
  private pageSize: number = 3;

  constructor(private http: HttpClient) {
  }

  getAllOrdersCount() {
    return this.http.get<number>(this.extendUrl + '/order/count');
  }

  getOrder(id: number) {
    return this.http
      .get<Orders>(`${this.extendUrl + '/order'}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getAllOrders(page: number) {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.pageSize.toString());
    return this.http.get<Orders[]>(this.extendUrl + '/order', {
      params: params
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

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orders: IOrders): IOrders {
    const copy: IOrders = Object.assign({}, orders, {
      orderDate: orders.orderDate != null && orders.orderDate.isValid() ? orders.orderDate.format(DATE_FORMAT) : null,
      dueDate: orders.dueDate != null && orders.dueDate.isValid() ? orders.dueDate.format(DATE_FORMAT) : null,
      shipDate: orders.shipDate != null && orders.shipDate.isValid() ? orders.shipDate.format(DATE_FORMAT) : null,
      pickingCompletedWhen:
        orders.pickingCompletedWhen != null && orders.pickingCompletedWhen.isValid()
          ? orders.pickingCompletedWhen.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {      
      res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
      res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
      res.body.shipDate = res.body.shipDate != null ? moment(res.body.shipDate) : null;
      res.body.pickingCompletedWhen = res.body.pickingCompletedWhen != null ? moment(res.body.pickingCompletedWhen) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((orders: IOrders) => {
        orders.orderDate = orders.orderDate != null ? moment(orders.orderDate) : null;
        orders.dueDate = orders.dueDate != null ? moment(orders.dueDate) : null;
        orders.shipDate = orders.shipDate != null ? moment(orders.shipDate) : null;
        orders.pickingCompletedWhen = orders.pickingCompletedWhen != null ? moment(orders.pickingCompletedWhen) : null;
      });
    }
    return res;
  }
}
