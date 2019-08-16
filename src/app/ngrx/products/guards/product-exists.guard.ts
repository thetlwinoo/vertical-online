import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ProductsService } from '@root/services';
import { ProductActions } from 'app/ngrx/products/actions';
import * as fromProducts from 'app/ngrx/products/reducers';
import { IProducts } from '@root/models';

@Injectable({
    providedIn: 'root',
})
export class ProductExistsGuard implements CanActivate {
    constructor(
        private store: Store<fromProducts.State>,
        private productsService: ProductsService,
        private router: Router
    ) { }

    waitForCollectionToLoad(): Observable<boolean> {
        return this.store.pipe(
            select(fromProducts.getCompareLoaded),
            filter(loaded => loaded),
            take(1)
        );
    }

    hasProductInStore(id: number): Observable<boolean> {
        return this.store.pipe(
            select(fromProducts.getProductEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    hasProductInApi(id: number): Observable<boolean> {
        return this.productsService.retrieveProduct(id).pipe(
            filter((res: HttpResponse<IProducts>) => res.ok),
            map((res: HttpResponse<IProducts>) => res.body),
            map(productEntity => ProductActions.loadProduct({ product: productEntity })),
            tap(action => this.store.dispatch(action)),
            map(product => !!product),
            catchError(() => {
                this.router.navigate(['/404']);
                return of(false);
            })
        );
    }

    hasProduct(id: number): Observable<boolean> {
        console.log('hasProduct',id)
        return this.hasProductInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    console.log('instore')
                    return of(inStore);
                }

                return this.hasProductInApi(id);
            })
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        // return this.waitForCollectionToLoad().pipe(
        //     switchMap(() => this.hasProduct(route.params['id']))
        // );
        return this.hasProduct(route.params['id']);
    }
}