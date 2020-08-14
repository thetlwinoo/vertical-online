import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '@vertical/constants';
import { createRequestOption } from '@vertical/utils';
import { IOrderPackages } from '@vertical/models';
import { ReviewsProps } from '@vertical/models/order-package-actions.model';

type EntityResponseType = HttpResponse<IOrderPackages>;
type EntityArrayResponseType = HttpResponse<IOrderPackages[]>;

@Injectable({ providedIn: 'root' })
export class OrderPackagesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/order-packages';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/order-packages-extend';

  constructor(protected http: HttpClient) {}

  updateReview(props: ReviewsProps): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(props);

    console.log('order package', copy);
    return this.http
      .put<ReviewsProps>(this.extendUrl + '/reviews', JSON.stringify(copy), { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(orderPackages: IOrderPackages): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderPackages);
    return this.http
      .post<IOrderPackages>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(orderPackages: IOrderPackages): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orderPackages);
    console.log('order package', copy);
    return this.http
      .put<IOrderPackages>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrderPackages>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrderPackages[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orderPackages: IOrderPackages): IOrderPackages {
    const copy: IOrderPackages = Object.assign({}, orderPackages, {
      expectedDeliveryDate:
        orderPackages.expectedDeliveryDate && orderPackages.expectedDeliveryDate.isValid()
          ? orderPackages.expectedDeliveryDate.toJSON()
          : undefined,
      customerReviewedOn:
        orderPackages.customerReviewedOn && orderPackages.customerReviewedOn.isValid()
          ? orderPackages.customerReviewedOn.toJSON()
          : undefined,
      lastEditedWhen:
        orderPackages.lastEditedWhen && orderPackages.lastEditedWhen.isValid() ? orderPackages.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expectedDeliveryDate = res.body.expectedDeliveryDate ? moment(res.body.expectedDeliveryDate) : undefined;
      res.body.customerReviewedOn = res.body.customerReviewedOn ? moment(res.body.customerReviewedOn) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((orderPackages: IOrderPackages) => {
        orderPackages.expectedDeliveryDate = orderPackages.expectedDeliveryDate ? moment(orderPackages.expectedDeliveryDate) : undefined;
        orderPackages.customerReviewedOn = orderPackages.customerReviewedOn ? moment(orderPackages.customerReviewedOn) : undefined;
        orderPackages.lastEditedWhen = orderPackages.lastEditedWhen ? moment(orderPackages.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
