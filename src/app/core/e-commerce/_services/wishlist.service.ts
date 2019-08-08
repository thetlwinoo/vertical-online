import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Wishlists } from "../_models";
import { environment } from '@app/env';

@Injectable()
export class WishlistService {
  securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/wishlist-extend';

  constructor(private http: HttpClient) {
  }

  fetchWishlist() {
    return this.http.get<Wishlists>(this.securedUrl + '/fetch');
  }

  isInWishlist(productId: number) {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    return this.http.get<Boolean>(this.securedUrl + '/check', {
      params: params
    });
  }

  addToWishlist(productId: number) {
    return this.http.post<Wishlists>(this.securedUrl + '/add', productId);
  }

  removeFromWishlist(id: number) {
    return this.http.delete<Wishlists>(this.securedUrl + '/remove', {
      params: new HttpParams().set('id', id.toString())
    })
  }

  emptyWishlist() {
    return this.http.delete(this.securedUrl + '/remove');
  }

}
