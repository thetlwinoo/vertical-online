import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Compares } from "../_models";
import { environment } from '@app/env';

@Injectable()
export class CompareService {
  securedUrl: string = `${environment.serverApi.baseUrl}` + 'api/compare-extend';

  constructor(private http: HttpClient) {
  }

  fetchCompare() {
    return this.http.get<Compares>(this.securedUrl + '/fetch');
  }

  isInCompare(productId: number) {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    return this.http.get<Boolean>(this.securedUrl + '/check', {
      params: params
    });
  }

  addToCompare(productId: number) {
    return this.http.post<Compares>(this.securedUrl + '/add', productId);
  }

  removeFromCompare(id: number) {
    return this.http.delete<Compares>(this.securedUrl + '/remove', {
      params: new HttpParams().set('id', id.toString())
    })
  }

  emptyCompare() {
    return this.http.delete(this.securedUrl + '/remove');
  }

}
