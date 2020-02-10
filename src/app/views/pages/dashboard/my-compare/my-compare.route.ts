import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from '@eps/services/core/auth/user-route-access.service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MyCompareComponent } from './my-compare.component';

@Injectable({ providedIn: 'root' })
export class MyCompareResolve {
    constructor() { }
}

export const myCompareRoute: Routes = [
    {
        path: '',
        component: MyCompareComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Compare'
        },
        canActivate: [UserRouteAccessService]
    }
];
