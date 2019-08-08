import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MyDashboardResolve implements Resolve<String> {
  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): String {
    console.log('Resolve', route.data.pageTitle)
    if (route.data.pageTitle) return route.data.pageTitle;
    else return "";
  }
}

const routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // resolve: {
    //   title: MyDashboardResolve
    // },
    data: {
      crumbs: [{
        label: 'Dashboard'
      }],
      authorities: ['ROLE_USER'],
      pageTitle: 'Dashboard'
    },
    canActivate: [],
    children: [
      {
        path: 'my-orders',
        loadChildren: './my-orders/my-orders.module#MyOrdersModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'My Orders'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'My Orders'
        },
        canActivate: []
      },
      {
        path: 'my-reviews',
        loadChildren: './my-reviews/my-reviews.module#MyReviewsModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'My Reviews'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'My Reviews'
        },
        canActivate: []
      },
      {
        path: 'my-profile',
        loadChildren: './my-profile/my-profile.module#MyProfileModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'My Profile'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'My Profile'
        },
        canActivate: []
      },
      {
        path: 'my-wishlist',
        loadChildren: './my-wishlist/my-wishlist.module#MyWishlistModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'My Wishlist'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'My Wishlist'
        },
        canActivate: []
      },
      {
        path: 'my-compare',
        loadChildren: './my-compare/my-compare.module#MyCompareModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'My Compoare'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'My Compare'
        },
        canActivate: []
      },
      {
        path: 'address-book',
        loadChildren: './my-addresses/my-addresses.module#MyAddressesModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'Address Book'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'Address Book'
        },
        canActivate: []
      },
      {
        path: 'my-payment-options',
        loadChildren: './my-payment-options/my-payment-options.module#MyPaymentOptionsModule',
        resolve: {
          title: MyDashboardResolve
        },
        data: {
          crumbs: [{
            label: 'Dashboard'
          }, {
            label: 'Payment Options'
          }],
          authorities: ['ROLE_USER'],
          pageTitle: 'My Payment Options'
        },
        canActivate: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule { }
