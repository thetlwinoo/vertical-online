import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbGuard } from '@root/services';

import {
    ViewProductPageComponent,
} from 'app/ngrx/products/containers';
import { ProductExistsGuard } from 'app/ngrx/products/guards';

export const routes: Routes = [
    {
        path: 'products/:id',
        component: ViewProductPageComponent,
        canActivate: [BreadcrumbGuard, ProductExistsGuard],
        data: {
            title: 'Product details',
            crumbs: [
                {
                    label: 'product'
                }, {
                    label: 'details'
                }
            ]
        },
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }
