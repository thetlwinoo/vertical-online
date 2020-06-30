import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Compares } from '@eps/models';
import { SERVER_API_URL } from '@eps/constants';

@Injectable()
export class CompareService {
  extendUrl: string = SERVER_API_URL + 'services/vscommerce/api/compare-extend';

  constructor(private http: HttpClient) {}

  fetchCompare() {
    return this.http.get<Compares>(this.extendUrl + '/fetch');
  }

  isInCompare(productId: number) {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    return this.http.get<boolean>(this.extendUrl + '/check', {
      params,
    });
  }

  addToCompare(productId: number) {
    return this.http.post<Compares>(this.extendUrl + '/add', productId);
  }

  removeFromCompare(id: number) {
    return this.http.delete<Compares>(this.extendUrl + '/remove', {
      params: new HttpParams().set('id', id.toString()),
    });
  }

  emptyCompare() {
    return this.http.delete(this.extendUrl + '/remove');
  }
}
