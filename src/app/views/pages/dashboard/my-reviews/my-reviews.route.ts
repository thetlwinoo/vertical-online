import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@vertical/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyReviewsComponent } from './my-reviews.component';
import { OrderService } from '@vertical/services';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import { OrderPackageActions, OrderLineActions } from 'app/ngrx/checkout/actions';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class MyReviewsResolve implements Resolve<any> {
  constructor(private orderService: OrderService, private store: Store<fromCheckout.State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
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
