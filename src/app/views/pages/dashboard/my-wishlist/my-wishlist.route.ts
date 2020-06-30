import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@eps/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyWishlistComponent } from './my-wishlist.component';

@Injectable({ providedIn: 'root' })
export class MyCompareResolve {
  constructor() {}
}

export const myWishlistRoute: Routes = [
  {
    path: '',
    component: MyWishlistComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'My Profile',
    },
    canActivate: [UserRouteAccessService],
  },
];
