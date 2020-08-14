import { NgModule } from '@angular/core';

import { HasAnyAuthorityDirective } from '@vertical/directives/auth/has-any-authority.directive';
import { RootIfOnDomDirective } from '@vertical/directives/root-if-on-dom/root-if-on-dom.directive';
import { RootInnerScrollDirective } from '@vertical/directives/root-inner-scroll/root-inner-scroll.directive';
import { RootPerfectScrollbarDirective } from '@vertical/directives/root-perfect-scrollbar/root-perfect-scrollbar.directive';
import { RootMatSidenavHelperDirective, RootMatSidenavTogglerDirective } from '@vertical/directives/root-mat-sidenav/root-mat-sidenav.directive';
import { HeaderScrollDirective } from '@vertical/directives/header-scroll.directive';

@NgModule({
    declarations: [
        HasAnyAuthorityDirective,
        RootIfOnDomDirective,
        RootInnerScrollDirective,
        RootMatSidenavHelperDirective,
        RootMatSidenavTogglerDirective,
        RootPerfectScrollbarDirective,
        HeaderScrollDirective
    ],
    imports     : [],
    exports     : [
        HasAnyAuthorityDirective,
        RootIfOnDomDirective,
        RootInnerScrollDirective,
        RootMatSidenavHelperDirective,
        RootMatSidenavTogglerDirective,
        RootPerfectScrollbarDirective,
        HeaderScrollDirective
    ]
})
export class RootDirectivesModule
{
}
