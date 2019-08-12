import { Route } from '@angular/router';

import { ActivateComponent } from './activate.component';
// import { BreadcrumbInitializedGuard } from '@root/services/breadcrumb-initialized-guard.service';

export const activateRoute: Route = {
    path: 'activate',
    component: ActivateComponent,
    data: {
        authorities: [],
        pageTitle: 'activate',
        crumbs: [{
            label: 'activate'
        }]
    },
    canActivate: [],
};
