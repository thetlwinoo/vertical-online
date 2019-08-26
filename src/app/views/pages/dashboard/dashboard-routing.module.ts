import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BreadcrumbGuard } from '@root/services';

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
    canActivate: [BreadcrumbGuard],
    children: [
      {
        path: 'my-orders',
        loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule),
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
        canActivate: [BreadcrumbGuard]
      },
      {
        path: 'my-reviews',
        loadChildren: () => import('./my-reviews/my-reviews.module').then(m => m.MyReviewsModule),
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
        canActivate: [BreadcrumbGuard]
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule),
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
        canActivate: [BreadcrumbGuard]
      },
      {
        path: 'my-wishlist',
        loadChildren: () => import('./my-wishlist/my-wishlist.module').then(m => m.MyWishlistModule),        
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
        canActivate: [BreadcrumbGuard]
      },
      {
        path: 'my-compare',
        loadChildren: () => import('./my-compare/my-compare.module').then(m => m.MyCompareModule),        
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
        canActivate: [BreadcrumbGuard]
      },
      {
        path: 'address-book',
        loadChildren: () => import('./my-addresses/my-addresses.module').then(m => m.MyAddressesModule),        
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
        canActivate: [BreadcrumbGuard]
      },
      {
        path: 'my-payment-options',
        loadChildren: () => import('./my-payment-options/my-payment-options.module').then(m => m.MyPaymentOptionsModule),        
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
        canActivate: [BreadcrumbGuard]
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
