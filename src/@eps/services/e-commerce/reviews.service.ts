import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL, DATE_FORMAT } from '@eps/constants';
import { createRequestOption } from '@eps/utils';
import { IReviews, IReviewLines } from '@eps/models';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IReviews>;
type EntityArrayResponseType = HttpResponse<IReviews[]>;

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/reviews';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/reviews-extend';

  constructor(protected http: HttpClient) {}

  create(reviews: IReviews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviews);
    return this.http
      .post<IReviews>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createExtend(reviews: IReviews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviews);
    let params = new HttpParams();
    params = params.set('orderId', reviews.orderId.toString());
    return this.http
      .post<IReviews>(this.extendUrl, copy, { observe: 'response', params })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reviews: IReviews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviews);
    return this.http
      .put<IReviews>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateExtend(reviews: IReviews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reviews);
    let params = new HttpParams();
    params = params.set('orderId', reviews.orderId.toString());
    return this.http
      .put<IReviews>(this.extendUrl, copy, { observe: 'response', params })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReviews>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReviews[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  // getReviewLinesByProductId(id: number): Observable<IReviewLines[]> {
  //   let params = new HttpParams();
  //   params = params.set('productId', id.toString());
  //   return this.http.get<IReviewLines[]>(this.extendUrl + '/reviewed', { observe: 'response', params });
  // }

  // createExtend(reviews: IReviews) {
  //   console.log('post review', reviews);
  //   let params = new HttpParams();
  //   params = params.set('orderId', reviews.orderId.toString());
  //   return this.http.post<Reviews>(this.extendUrl + '/save', reviews, { observe: 'response', params });
  // }

  // updateExtend(reviews: IReviews, orderId: number) {
  //   console.log('post review', reviews);
  //   let params = new HttpParams();
  //   params = params.set('orderId', orderId.toString());
  //   return this.http.put<Reviews>(this.extendUrl + '/save', reviews, { observe: 'response', params });
  // }

  protected convertDateFromClient(reviews: IReviews): IReviews {
    const copy: IReviews = Object.assign({}, reviews, {
      reviewDate: reviews.reviewDate && reviews.reviewDate.isValid() ? reviews.reviewDate.toJSON() : undefined,
      lastEditedWhen: reviews.lastEditedWhen && reviews.lastEditedWhen.isValid() ? reviews.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reviewDate = res.body.reviewDate ? moment(res.body.reviewDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reviews: IReviews) => {
        reviews.reviewDate = reviews.reviewDate ? moment(reviews.reviewDate) : undefined;
        reviews.lastEditedWhen = reviews.lastEditedWhen ? moment(reviews.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
