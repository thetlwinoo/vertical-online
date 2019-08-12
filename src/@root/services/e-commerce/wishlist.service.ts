import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Wishlists } from "@root/models";
import { SERVER_API_URL } from '@root/constants';

@Injectable()
export class WishlistService {
  extendUrl: string = SERVER_API_URL + 'api/wishlist-extend';

  constructor(private http: HttpClient) {
  }

  fetchWishlist() {
    return this.http.get<Wishlists>(this.extendUrl + '/fetch');
  }

  isInWishlist(productId: number) {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    return this.http.get<Boolean>(this.extendUrl + '/check', {
      params: params
    });
  }

  addToWishlist(productId: number) {
    return this.http.post<Wishlists>(this.extendUrl + '/add', productId);
  }

  removeFromWishlist(id: number) {
    return this.http.delete<Wishlists>(this.extendUrl + '/remove', {
      params: new HttpParams().set('id', id.toString())
    })
  }

  emptyWishlist() {
    return this.http.delete(this.extendUrl + '/remove');
  }

}
