import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ShoppingCarts } from "../_models";
import { environment } from '@app/env';

@Injectable()
export class CartService {
  securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/shopping-carts-extend/cart';

  constructor(private httpClient: HttpClient) {
  }

  getCart() {
    return this.httpClient.get<ShoppingCarts>(this.securedUrl);
  }

  postCart(productId: number, quantity: number) {
    return this.httpClient.post<ShoppingCarts>(this.securedUrl, {
      productId: productId,
      amount: quantity
    });
  }

  removeFromCart(id: number) {
    return this.httpClient.delete<ShoppingCarts>(this.securedUrl, {
      params: new HttpParams().set('id', id.toString())
    })
  }

  reduceFromCart(id: number, quantity: number) {
    console.log('reduce', id)
    return this.httpClient.post<ShoppingCarts>(this.securedUrl + '/reduce', {
      id: id,
      quantity: quantity
    });
  }

  confirmCart(cart: ShoppingCarts) {
    return this.httpClient.post(this.securedUrl + '/confirm', cart);
  }

  applyDiscount(code: string) {
    return this.httpClient.get<ShoppingCarts>(this.securedUrl + '/discount', {
      params: new HttpParams().set('code', code)
    });
  }

  emptyCart() {
    return this.httpClient.delete(this.securedUrl);
  }


}
