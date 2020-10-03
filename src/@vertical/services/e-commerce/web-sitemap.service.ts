import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '@vertical/constants';
import { createRequestOption } from '@vertical/utils';
import { IWebSitemap } from '@vertical/models';

type EntityResponseType = HttpResponse<IWebSitemap>;
type EntityArrayResponseType = HttpResponse<IWebSitemap[]>;

@Injectable({ providedIn: 'root' })
export class WebSitemapService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/web-sitemaps';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/web-sitemaps-extend';

  constructor(protected http: HttpClient) {}

  create(webSitemap: IWebSitemap): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(webSitemap);
    return this.http
      .post<IWebSitemap>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(webSitemap: IWebSitemap): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(webSitemap);
    return this.http
      .put<IWebSitemap>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWebSitemap>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWebSitemap[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHomePage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/home-page', { observe: 'response' });
  }

  getFlashDealCollectionPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/flash-deal-collection-page', { observe: 'response' });
  }

  getBrandCollectionPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/brand-collection-page', { observe: 'response' });
  }

  getCashBackPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/cash-back-page', { observe: 'response' });
  }

  getCategoriesPage(categoryId: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('categoryId', categoryId.toString());

    return this.http.get<any>(this.extendUrl + '/categories-page', { params, observe: 'response' });
  }

  getCollectVoucherPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/collect-voucher-page', { observe: 'response' });
  }

  getOfficialStoresPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/official-stores-page', { observe: 'response' });
  }

  getSearchPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/search-page', { observe: 'response' });
  }

  getTermsAndConditionPage(): Observable<any> {
    return this.http.get<any>(this.extendUrl + '/terms-and-condition-page', { observe: 'response' });
  }

  protected convertDateFromClient(webSitemap: IWebSitemap): IWebSitemap {
    const copy: IWebSitemap = Object.assign({}, webSitemap, {
      validFrom: webSitemap.validFrom && webSitemap.validFrom.isValid() ? webSitemap.validFrom.toJSON() : undefined,
      validTo: webSitemap.validTo && webSitemap.validTo.isValid() ? webSitemap.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((webSitemap: IWebSitemap) => {
        webSitemap.validFrom = webSitemap.validFrom ? moment(webSitemap.validFrom) : undefined;
        webSitemap.validTo = webSitemap.validTo ? moment(webSitemap.validTo) : undefined;
      });
    }
    return res;
  }
}
