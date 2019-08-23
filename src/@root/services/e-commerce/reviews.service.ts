import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL, DATE_FORMAT } from '@root/constants';
import { createRequestOption } from '@root/utils';
import { IProducts, Reviews, IReviews, IOrders, Orders, IReviewLines,ReviewLines } from '@root/models';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<IReviews>;
type EntityArrayResponseType = HttpResponse<IReviews[]>;

type EntityOrdersResponseType = HttpResponse<IOrders>;
type EntityOrdersArrayResponseType = HttpResponse<IOrders[]>;

type EntityReviewLinesArrayResponseType = HttpResponse<IReviewLines[]>;

@Injectable({ providedIn: 'root' })
export class ReviewsService {
    public resourceUrl = SERVER_API_URL + 'api/reviews';
    public extendUrl = SERVER_API_URL + 'api/reviews-extend';

    constructor(protected http: HttpClient) { }

    create(reviews: IReviews): Observable<EntityResponseType> {
        return this.http.post<IReviews>(this.resourceUrl, reviews, { observe: 'response' });
    }

    update(reviews: IReviews): Observable<EntityResponseType> {
        return this.http.put<IReviews>(this.resourceUrl, reviews, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReviews>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReviews[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getOrderedProducts(): Observable<EntityOrdersArrayResponseType> {
        return this.http
            .get<any[]>(this.extendUrl + '/ordered-products', { observe: 'response' })
            .pipe(map((res: EntityOrdersArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    // getReviewsByOrderId(id: number): Observable<EntityResponseType> {
    //     let params = new HttpParams();
    //     params = params.set('orderId', id.toString());
    //     return this.http.get<IReviews>(this.extendUrl + '/reviews', { observe: 'response', params: params });
    // }

    getReviewLinesByProductId(id: number): Observable<EntityReviewLinesArrayResponseType> {
        let params = new HttpParams();
        params = params.set('productId', id.toString());
        return this.http.get<IReviewLines[]>(this.extendUrl + '/reviewed', { observe: 'response', params: params });
    }

    createExtend(reviews: IReviews) {
        console.log('post review', reviews);
        let params = new HttpParams();
        params = params.set('orderId', reviews.orderId.toString());
        return this.http.post<Reviews>(this.extendUrl + '/save', reviews, { observe: 'response', params: params });
    }

    updateExtend(reviews: IReviews, orderId: number) {
        console.log('post review', reviews);
        let params = new HttpParams();
        params = params.set('orderId', orderId.toString());
        return this.http.put<Reviews>(this.extendUrl + '/save', reviews, { observe: 'response', params: params });
    }

    createReviewLines(reviewLines: IReviewLines) {
        return this.http.post<Reviews>(this.extendUrl + '/add/review-lines', reviewLines, { observe: 'response'});
    }

    completedReviews(orderId: number) {
        let params = new HttpParams();
        params = params.set('orderId', orderId.toString());
        return this.http.post<Reviews>(this.extendUrl + '/completed', {}, { observe: 'response', params: params });
    }

    protected convertDateFromClient(orders: IOrders): IOrders {
        const copy: IOrders = Object.assign({}, orders, {
            orderDate: orders.orderDate != null && orders.orderDate.isValid() ? orders.orderDate.format(DATE_FORMAT) : null,
            dueDate: orders.dueDate != null && orders.dueDate.isValid() ? orders.dueDate.format(DATE_FORMAT) : null,
            shipDate: orders.shipDate != null && orders.shipDate.isValid() ? orders.shipDate.format(DATE_FORMAT) : null,
            pickingCompletedWhen:
                orders.pickingCompletedWhen != null && orders.pickingCompletedWhen.isValid()
                    ? orders.pickingCompletedWhen.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityOrdersResponseType): EntityOrdersResponseType {
        if (res.body) {
            res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
            res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
            res.body.shipDate = res.body.shipDate != null ? moment(res.body.shipDate) : null;
            res.body.pickingCompletedWhen = res.body.pickingCompletedWhen != null ? moment(res.body.pickingCompletedWhen) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityOrdersArrayResponseType): EntityOrdersArrayResponseType {
        if (res.body) {
            res.body.forEach((orders: IOrders) => {
                orders.orderDate = orders.orderDate != null ? moment(orders.orderDate) : null;
                orders.dueDate = orders.dueDate != null ? moment(orders.dueDate) : null;
                orders.shipDate = orders.shipDate != null ? moment(orders.shipDate) : null;
                orders.pickingCompletedWhen = orders.pickingCompletedWhen != null ? moment(orders.pickingCompletedWhen) : null;
            });
        }
        return res;
    }
}
