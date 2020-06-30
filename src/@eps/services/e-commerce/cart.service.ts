import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IShoppingCarts, ChangedOrderAllProps, ChangeDeliveryMethodProps } from '@eps/models';
import { SERVER_API_URL } from '@eps/constants';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { createRequestOption } from '@eps/utils';

type EntityResponseType = HttpResponse<IShoppingCarts>;
type EntityArrayResponseType = HttpResponse<IShoppingCarts[]>;

@Injectable()
export class CartService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/shopping-carts';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/shopping-carts-extend';

  constructor(private http: HttpClient) {}

  getCart(): Observable<EntityResponseType> {
    return this.http.get<IShoppingCarts>(this.extendUrl + '/cart', { observe: 'response' });
  }

  postCart(stockItemId: number, quantity: number): Observable<EntityResponseType> {
    return this.http.post<IShoppingCarts>(
      this.extendUrl + '/cart',
      {
        stockItemId,
        amount: quantity,
      },
      { observe: 'response' }
    );
  }

  removeFromCart(id: number): Observable<EntityResponseType> {
    return this.http.delete<IShoppingCarts>(this.extendUrl + '/cart', {
      params: new HttpParams().set('id', id.toString()),
      observe: 'response',
    });
  }

  removeListFromCart(idList: string): Observable<EntityResponseType> {
    return this.http.delete<IShoppingCarts>(this.extendUrl + '/cart/deletelist', {
      params: new HttpParams().set('idlist', idList),
      observe: 'response',
    });
  }

  reduceFromCart(id: number, quantity: number): Observable<EntityResponseType> {
    return this.http.post<IShoppingCarts>(
      this.extendUrl + '/cart/reduce',
      {
        id,
        quantity,
      },
      { observe: 'response' }
    );
  }

  changedAddToOrder(id: number, isSelectOrder: boolean): Observable<EntityResponseType> {
    return this.http.post<IShoppingCarts>(
      this.extendUrl + '/cart/change',
      {
        id,
        isSelectOrder,
      },
      { observe: 'response' }
    );
  }

  changeOrderAll(props: ChangedOrderAllProps): Observable<EntityResponseType> {
    let params = new HttpParams();
    params = params.set('status', props.checked.toString());

    if (props.packageId !== null) {
      params = params.set('packageId', props.packageId.toString());
    }

    return this.http.post<IShoppingCarts>(this.extendUrl + '/cart/changeall', params, { observe: 'response' });
  }

  changeDeliveryMethod(props: ChangeDeliveryMethodProps): Observable<EntityResponseType> {
    let params = new HttpParams();
    params = params.set('deliveryMethodId', props.deliveryMethodId.toString());
    params = params.set('cartId', props.cartId.toString());
    params = params.set('supplierId', props.supplierId.toString());

    return this.http.put<IShoppingCarts>(this.extendUrl + '/cart/delivery-method', params, { observe: 'response' });
  }

  confirmCart(cart: IShoppingCarts): Observable<HttpResponse<any>> {
    return this.http.post(this.extendUrl + '/cart/confirm', cart, { observe: 'response' });
  }

  emptyCart(): Observable<HttpResponse<any>> {
    return this.http.delete(this.extendUrl + '/cart', { observe: 'response' });
  }

  create(shoppingCarts: IShoppingCarts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shoppingCarts);
    return this.http
      .post<IShoppingCarts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(shoppingCarts: IShoppingCarts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shoppingCarts);
    return this.http
      .put<IShoppingCarts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IShoppingCarts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShoppingCarts[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(shoppingCarts: IShoppingCarts): IShoppingCarts {
    const copy: IShoppingCarts = Object.assign({}, shoppingCarts, {
      lastEditedWhen:
        shoppingCarts.lastEditedWhen && shoppingCarts.lastEditedWhen.isValid() ? shoppingCarts.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((shoppingCarts: IShoppingCarts) => {
        shoppingCarts.lastEditedWhen = shoppingCarts.lastEditedWhen ? moment(shoppingCarts.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
