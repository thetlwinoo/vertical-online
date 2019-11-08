import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, ITEMS_PER_PAGE, SERVER_API_URL } from '@epm/constants';
import { createRequestOption } from '@epm/utils';
import { IProducts, IProductSubCategory } from '@epm/models';

type EntityResponseType = HttpResponse<IProducts>;
type EntityArrayResponseType = HttpResponse<IProducts[]>;

@Injectable({ providedIn: 'root' })
export class ProductsService {
    public resourceUrl = SERVER_API_URL + 'api/products';
    public extendUrl = SERVER_API_URL + 'api/products-extend';
    browsePageSize: number = ITEMS_PER_PAGE;

    constructor(protected http: HttpClient) { }

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
            .get<IProducts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
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

        return this.http.get<Object[]>(this.extendUrl,
            {
                params: params
            });
    }

    retrieveProduct(id: number): Observable<EntityResponseType> {
        return this.http.get<IProducts>(this.extendUrl + '/product', {
            params: new HttpParams().set('id', id.toString()),
            observe: 'response'
        });
    }

    getRelatedProducts(id: number): Observable<EntityArrayResponseType> {
        let params = new HttpParams();
        params = params.set('id', id.toString());
        return this.http.get<IProducts[]>(this.extendUrl + '/related', { params: params, observe: 'response' });
    }

    getNewlyAdded(): Observable<EntityArrayResponseType> {
        return this.http.get<IProducts[]>(this.extendUrl + '/recent', { observe: 'response' });
    }

    getMostSelling(): Observable<EntityArrayResponseType> {
        return this.http.get<IProducts[]>(this.extendUrl + '/mostselling', { observe: 'response' });
    }

    getInterested(): Observable<EntityArrayResponseType> {
        return this.http.get<IProducts[]>(this.extendUrl + '/interested', { observe: 'response' });
    }

    getDailyDiscover(): Observable<EntityArrayResponseType> {
        return this.http.get<IProducts[]>(this.extendUrl + '/dailydiscover', { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProducts[]>(this.extendUrl + '/search', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    searchAll(keyword: string): Observable<EntityArrayResponseType> {
        let params = new HttpParams();
        params = params.append('keyword', keyword);
        return this.http.get<IProducts[]>(this.extendUrl + '/searchall', { params: params, observe: 'response' });
    }

    relatedCategories(keyword: string, category: string): Observable<HttpResponse<IProductSubCategory[]>> {
        let params = new HttpParams();

        params = params.append('keyword', keyword ? keyword : '');
        params = params.append('category', category ? category : '');
        return this.http.get<IProductSubCategory[]>(this.extendUrl + '/related/categories', { params: params, observe: 'response' });
    }

    relatedColors(keyword: string, category: string): Observable<HttpResponse<string[]>> {
        let params = new HttpParams();
        params = keyword ? params.append('keyword', keyword) : params;
        params = category ? params.append('category', category) : params;
        return this.http.get<string[]>(this.extendUrl + '/related/colors', { params: params, observe: 'response' });
    }

    relatedBrands(keyword: string, category: string): Observable<HttpResponse<string[]>> {
        let params = new HttpParams();
        params = params.append('keyword', keyword ? keyword : '');
        params = params.append('category', category ? category : '');
        return this.http.get<string[]>(this.extendUrl + '/related/brands', { params: params, observe: 'response' });
    }

    relatedPriceRange(keyword: string, category: string): Observable<HttpResponse<any[]>> {
        let params = new HttpParams();
        params = keyword ? params.append('keyword', keyword) : params;
        params = category ? params.append('category', category) : params;
        return this.http.get<string[]>(this.extendUrl + '/related/pricerange', { params: params, observe: 'response' });
    }

    protected convertDateFromClient(products: IProducts): IProducts {
        const copy: IProducts = Object.assign({}, products, {
            sellStartDate:
                products.sellStartDate != null && products.sellStartDate.isValid() ? products.sellStartDate.format(DATE_FORMAT) : null,
            sellEndDate: products.sellEndDate != null && products.sellEndDate.isValid() ? products.sellEndDate.format(DATE_FORMAT) : null,
            discontinuedDate:
                products.discontinuedDate != null && products.discontinuedDate.isValid()
                    ? products.discontinuedDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.sellStartDate = res.body.sellStartDate != null ? moment(res.body.sellStartDate) : null;
            res.body.sellEndDate = res.body.sellEndDate != null ? moment(res.body.sellEndDate) : null;
            res.body.discontinuedDate = res.body.discontinuedDate != null ? moment(res.body.discontinuedDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((products: IProducts) => {
                products.sellStartDate = products.sellStartDate != null ? moment(products.sellStartDate) : null;
                products.sellEndDate = products.sellEndDate != null ? moment(products.sellEndDate) : null;
                products.discontinuedDate = products.discontinuedDate != null ? moment(products.discontinuedDate) : null;
            });
        }
        return res;
    }
}
