import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IReviewLines } from '@eps/models';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<IReviewLines>;
type EntityArrayResponseType = HttpResponse<IReviewLines[]>;

@Injectable({ providedIn: 'root' })
export class ReviewLinesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/review-lines';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/review-lines-extend';

  constructor(protected http: HttpClient) {}

  create(reviewLines: IReviewLines): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewLines);
    return this.http
      .post<IReviewLines>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createExtend(reviewLines: IReviewLines): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewLines);
    let params = new HttpParams();
    params = params.set('orderLineId', reviewLines.orderLineId.toString());
    return this.http
      .post<IReviewLines>(this.extendUrl, copy, { observe: 'response', params })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reviewLines: IReviewLines): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewLines);
    return this.http
      .put<IReviewLines>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateExtend(reviewLines: IReviewLines): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviewLines);
    let params = new HttpParams();
    params = params.set('orderLineId', reviewLines.orderLineId.toString());
    return this.http
      .put<IReviewLines>(this.extendUrl, copy, { observe: 'response', params })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReviewLines>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReviewLines[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getReviewDetails(productId: number): Observable<HttpResponse<IReviewLines[]>> {
    let params = new HttpParams();
    params = params.set('productId', productId.toString());
    return this.http.get<IReviewLines[]>(this.extendUrl + '/filter', { params, observe: 'response' });
  }

  protected convertDateFromClient(reviewLines: IReviewLines): IReviewLines {
    const copy: IReviewLines = Object.assign({}, reviewLines, {
      lastEditedWhen: reviewLines.lastEditedWhen && reviewLines.lastEditedWhen.isValid() ? reviewLines.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reviewLines: IReviewLines) => {
        reviewLines.lastEditedWhen = reviewLines.lastEditedWhen ? moment(reviewLines.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
