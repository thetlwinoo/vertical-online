import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams } from "@angular/common/http";
import { IShoppingCarts } from "@epm/models";
import { SERVER_API_URL } from '@epm/constants';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IShoppingCarts>;
type EntityArrayResponseType = HttpResponse<IShoppingCarts[]>;

@Injectable()
export class CartService {
  extendUrl: string = SERVER_API_URL + 'api/shopping-carts-extend/cart';

  constructor(private httpClient: HttpClient) {
  }

  getCart(): Observable<EntityResponseType> {
    console.log('fetch cart')
    return this.httpClient.get<IShoppingCarts>(this.extendUrl, { observe: 'response' });
  }

  postCart(productId: number, quantity: number): Observable<EntityResponseType> {
    console.log('post cart',productId,quantity)
    return this.httpClient.post<IShoppingCarts>(this.extendUrl, {
      productId: productId,
      amount: quantity
    }, { observe: 'response' });
  }

  removeFromCart(id: number): Observable<EntityResponseType> {
    return this.httpClient.delete<IShoppingCarts>(this.extendUrl, {
      params: new HttpParams().set('id', id.toString()),
      observe: 'response'
    })
  }

  reduceFromCart(id: number, quantity: number): Observable<EntityResponseType> {
    console.log('reduce', id)
    return this.httpClient.post<IShoppingCarts>(this.extendUrl + '/reduce', {
      id: id,
      quantity: quantity
    }, { observe: 'response' });
  }

  confirmCart(cart: IShoppingCarts): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.extendUrl + '/confirm', cart, { observe: 'response' });
  }

  applyDiscount(code: string): Observable<EntityResponseType> {
    return this.httpClient.get<IShoppingCarts>(this.extendUrl + '/discount', {
      params: new HttpParams().set('code', code),
      observe: 'response'
    });
  }

  emptyCart(): Observable<HttpResponse<any>> {
    return this.httpClient.delete(this.extendUrl, { observe: 'response' });
  }


}
