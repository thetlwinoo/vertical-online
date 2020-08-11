import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, ITEMS_PER_PAGE, SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IProducts, IProductCategory, IStockItems, IReviewLines } from '@eps/models';
import { StockItemsService } from '@eps/services/e-commerce/stock-items.service';

type EntityResponseType = HttpResponse<IProducts>;
type EntityArrayResponseType = HttpResponse<IProducts[]>;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/products';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/products-extend';
  browsePageSize: number = ITEMS_PER_PAGE;

  constructor(protected http: HttpClient, private stockItemsService: StockItemsService) {}

  create(products: IProducts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(products);
    return this.http
      .post<IProducts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(products: IProducts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(products);
    return this.http
      .put<IProducts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProducts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProducts[]>(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  getProducts(page: number, sort: string, category: string) {
    if (page === undefined && page === null && page < 0) {
      return;
    }
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', this.browsePageSize.toString());
    if (sort !== undefined && sort !== null && sort !== 'any') {
      params = params.set('sort', sort);
    }
    if (category !== undefined && category !== null && category !== 'any') {
      params = params.set('category', category);
    }

    return this.http.get<Record<string, any>[]>(this.extendUrl, {
      params,
    });
  }

  retrieveProduct(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProducts>(`${this.extendUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getRelatedProducts(id: number): Observable<EntityArrayResponseType> {
    let params = new HttpParams();
    params = params.set('id', id.toString());
    return this.http.get<IProducts[]>(this.extendUrl + '/related', {
      params,
      observe: 'response',
    });
  }

  getNewlyAdded(): Observable<EntityArrayResponseType> {
    return this.http.get<IProducts[]>(this.extendUrl + '/recent', { observe: 'response' });
  }

  getMostSelling(): Observable<EntityArrayResponseType> {
    return this.http.get<IProducts[]>(this.extendUrl + '/mostselling', {
      observe: 'response',
    });
  }

  getInterested(): Observable<EntityArrayResponseType> {
    return this.http.get<IProducts[]>(this.extendUrl + '/interested', {
      observe: 'response',
    });
  }

  getDailyDiscover(): Observable<EntityArrayResponseType> {
    return this.http.get<IProducts[]>(this.extendUrl + '/dailydiscover', {
      observe: 'response',
    });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);

    return this.http
      .get<IProducts[]>(this.extendUrl + '/search', {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  searchAll(keyword: string): Observable<EntityArrayResponseType> {
    let params = new HttpParams();
    params = params.append('keyword', keyword);
    return this.http.get<IProducts[]>(this.extendUrl + '/searchall', {
      params,
      observe: 'response',
    });
  }

  searchKeywords(keyword: string): Observable<EntityArrayResponseType> {
    let params = new HttpParams();
    params = params.append('keyword', keyword);
    return this.http.get<IProducts[]>(this.extendUrl + '/searchkeywords', {
      params,
      observe: 'response',
    });
  }

  relatedCategories(keyword: string, category: string): Observable<HttpResponse<IProductCategory[]>> {
    let params = new HttpParams();

    params = params.append('keyword', keyword ? keyword : '');
    params = params.append('category', category ? category : '');
    return this.http.get<IProductCategory[]>(this.extendUrl + '/related/categories', { params, observe: 'response' });
  }

  relatedColors(keyword: string, category: string): Observable<HttpResponse<string[]>> {
    let params = new HttpParams();
    params = keyword ? params.append('keyword', keyword) : params;
    params = category ? params.append('category', category) : params;

    return this.http.get<string[]>(this.extendUrl + '/related/colors', {
      params,
      observe: 'response',
    });
  }

  relatedBrands(keyword: string, category: string): Observable<HttpResponse<string[]>> {
    let params = new HttpParams();
    params = params.append('keyword', keyword ? keyword : '');
    params = params.append('category', category ? category : '');
    return this.http.get<string[]>(this.extendUrl + '/related/brands', {
      params,
      observe: 'response',
    });
  }

  relatedPriceRange(keyword: string, category: string): Observable<HttpResponse<any[]>> {
    let params = new HttpParams();
    params = keyword ? params.append('keyword', keyword) : params;
    params = category ? params.append('category', category) : params;
    return this.http.get<string[]>(this.extendUrl + '/related/pricerange', {
      params,
      observe: 'response',
    });
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.extendUrl}/details/${id}`, {
      observe: 'response',
    });
  }

  filterProducts(req?: any): Observable<any> {
    const options = createRequestOption(req);

    console.log('options', options);
    return this.http.get<any>(this.extendUrl + '/filter', {
      params: options,
      observe: 'response',
    });
  }

  filterControllers(req?: any): Observable<any> {
    const options = createRequestOption(req);

    console.log('options', options);
    return this.http.get<any>(this.extendUrl + '/filter-controllers', {
      params: options,
      observe: 'response',
    });
  }

  getProductsHome(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/home', { observe: 'response' });
  }

  getTags(query: string): Observable<HttpResponse<string[]>> {
    let params = new HttpParams();
    params = params.append('filter', query);
    return this.http.get<any>(this.extendUrl + '/tags', { params, observe: 'response' });
  }

  protected convertDateFromClient(products: IProducts): IProducts {
    const copy: IProducts = Object.assign({}, products, {
      lastEditedWhen: products.lastEditedWhen !== null && products.lastEditedWhen.isValid() ? products.lastEditedWhen.toJSON() : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastEditedWhen = res.body.lastEditedWhen !== null ? moment(res.body.lastEditedWhen) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((products: IProducts) => {
        products.lastEditedWhen = products.lastEditedWhen !== null ? moment(products.lastEditedWhen) : null;
      });
    }
    return res;
  }
}
