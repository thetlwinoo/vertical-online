import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@eps/services/core/auth/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyReviewsComponent } from './my-reviews.component';
import { ReviewsService, OrderService } from '@eps/services';
import { Reviews, IReviews, Orders, IOrders, ReviewLines, IReviewLines } from '@eps/models';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class MyReviewsResolve implements Resolve<Reviews> {
    constructor(
        private orderService: OrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reviews> {
        const id = route.params['id'] ? route.params['id'] : null;

        if (id) {
            return this.orderService.getOrder(id).pipe(
                filter((response: HttpResponse<Orders>) => response.ok),
                map((orders: HttpResponse<Orders>) => {
                    console.log('erer', orders.body)
                    if (orders.body.orderReview == null) {
                        let newReviews = new Reviews();
                        newReviews.orderId = orders.body.id;
                        newReviews.reviewLists = [];
                        
                        orders.body.orderLineLists.map(orderLine => {
                            let reviewLines: ReviewLines = new ReviewLines();
                            reviewLines.productRating = 5;
                            reviewLines.deliveryRating = 0;
                            reviewLines.sellerRating = 0;
                            reviewLines.productId = orderLine.product.id;   
                            reviewLines.product = orderLine.product;                   
                            newReviews.reviewLists.push(reviewLines);
                            orders.body.orderReview = newReviews;
                        });

                        console.log('erwereere',orders.body)
                        return orders.body;
                    }

                    return orders.body;
                })
            );
        }
    }
}

export const myReviewsRoute: Routes = [
    {
        path: '',
        component: MyReviewsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Reviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReviewDetailsComponent,
        // resolve: {
        //     orders: MyReviewsResolve
        // },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'View Review'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/new',
        component: ReviewUpdateComponent,
        resolve: {
            orders: MyReviewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Write Review'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReviewUpdateComponent,
        resolve: {
            orders: MyReviewsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Edit Review'
        },
        canActivate: [UserRouteAccessService]
    },
];
