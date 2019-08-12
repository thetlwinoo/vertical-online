import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Products, IProducts } from "@root/models";
import { SERVER_API_URL } from '@root/constants';
import { Observable } from 'rxjs';
type EntityResponseType = HttpResponse<IProducts>;

@Injectable()
export class ProductService {

  resourceUrl: string = SERVER_API_URL + 'api/products-extend';
  categoryUrl: string = 'backendresourceUrl/api/category';

  browsePageSize: number = 20;
  searchPageSize: number = 10;

  constructor(private httpClient: HttpClient) {
  }

  getProducts(page: number, sort: string, category: string) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());
    if (sort !== undefined && sort !== null && sort != 'any') {
      params = params.set('sort', sort);
    }
    if (category !== undefined && category !== null && category != 'any') {
      params = params.set('category', category);
    }

    return this.httpClient.get<Object[]>(this.resourceUrl,
      {
        params: params
      });
  }

  getFullProduct(id: number): Observable<EntityResponseType> {
    return this.httpClient.get<IProducts>(this.resourceUrl + '/product',
      {
        params: new HttpParams().set('id', id.toString()),
        observe: 'response'
      });
  }

  getRelatedProducts(id: number) {
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/related',
      {
        params: new HttpParams().set('id', id.toString())
      });
  }

  getNewlyAdded() {
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/recent');
  }

  getMostSelling() {
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/mostselling');
  }

  getInterested() {
    console.log('interested')
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/interested');
  }

  getDailyDiscover() {
    console.log('daily discover')
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/dailydiscover');
  }

  searchProduct(page: number, keyword: string) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('keyword', keyword);
    params = params.append('pageable', 'true');
    params = params.set('size', this.searchPageSize.toString());
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/search', {
      params: params
    })
  }

  searchProductAll(keyword: string) {
    let params = new HttpParams();
    params = params.append('page', '0');
    params = params.append('size', '0');
    params = params.append('pageable', 'false');
    params = params.append('keyword', keyword);
    console.log(params)
    return this.httpClient.get<IProducts[]>(this.resourceUrl + '/search', {
      params: params
    })
  }

  getCategory() {
    return this.httpClient.get<Object[]>(this.categoryUrl);
  }

}
