import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Wishlists, IStockItems } from '@eps/models';
import { SERVER_API_URL } from '@eps/constants';
import { IWishlists, IProducts } from '@eps/models';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IWishlists>;
type EntityArrayResponseType = HttpResponse<IProducts[]>;

@Injectable()
export class WishlistService {
  extendUrl: string = SERVER_API_URL + 'services/vscommerce/api/wishlists-extend';

  constructor(private http: HttpClient) {}

  fetchWishlist(): Observable<EntityResponseType> {
    return this.http.get<IWishlists>(this.extendUrl + '/fetch', { observe: 'response' });
  }

  fetchWishlistStockItems(): Observable<EntityArrayResponseType> {
    return this.http.get<IProducts[]>(this.extendUrl + '/fetch/products', { observe: 'response' });
  }

  isInWishlist(id: number): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('stockItemId', id.toString());
    return this.http.get<boolean>(this.extendUrl + '/check', {
      params,
    });
  }

  addToWishlist(id: number): Observable<HttpResponse<IStockItems>> {
    return this.http.post<HttpResponse<IStockItems>>(this.extendUrl + '/add', id);
  }

  removeFromWishlist(id: number): Observable<HttpResponse<IStockItems>> {
    return this.http.delete<HttpResponse<IStockItems>>(this.extendUrl + '/remove', {
      params: new HttpParams().set('id', id.toString()),
    });
  }

  emptyWishlist(): void {
    this.http.delete(this.extendUrl + '/remove');
  }
}
