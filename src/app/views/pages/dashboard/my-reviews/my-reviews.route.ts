import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@eps/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyReviewsComponent } from './my-reviews.component';
import { ReviewsService, OrderService } from '@eps/services';
import { Reviews, IReviews, Orders, IOrders, ReviewLines, IReviewLines } from '@eps/models';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import { OrderPackageActions, OrderLineActions, ReviewActions } from 'app/ngrx/checkout/actions';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { JhiResolvePagingParams } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class MyReviewsResolve implements Resolve<Reviews> {
  constructor(private orderService: OrderService, private store: Store<fromCheckout.State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reviews> {
    const id = route.params.id ? route.params.id : null;

    if (id) {
      this.store.dispatch(OrderPackageActions.getOrderPackage({ id }));
      this.store.dispatch(OrderLineActions.fetchOrderLines({ orderPackageId: id }));
    }
    return of(null);
  }
}

export const myReviewsRoute: Routes = [
  {
    path: '',
    component: MyReviewsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'My Reviews',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReviewDetailsComponent,
    // resolve: {
    //     orders: MyReviewsResolve
    // },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'View Review',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/write-reviews',
    component: ReviewUpdateComponent,
    resolve: {
      orders: MyReviewsResolve,
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Write Review',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReviewUpdateComponent,
    // resolve: {
    //   orders: MyReviewsResolve,
    // },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'Edit Review',
    },
    canActivate: [UserRouteAccessService],
  },
];
