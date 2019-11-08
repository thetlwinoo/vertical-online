// import 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { rootConfig } from 'app/root-config';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from 'app/layout/layout.module';
import { RootSharedModule } from '@epm/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { RootModule } from '@epm/root.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '@epm/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '@epm/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@epm/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '@epm/blocks/interceptor/notification.interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { RootProgressBarModule } from '@epm/components/progress-bar/progress-bar.module';
import { ROOT_REDUCERS, metaReducers } from 'app/ngrx';
import { NgrxCoreModule } from 'app/ngrx/core';
import { RouterEffects } from 'app/ngrx/core/effects';
import './vendor.ts';
import 'hammerjs';
import { ProductsModule } from 'app/ngrx/products';
import { CheckoutModule } from 'app/ngrx/checkout';
import { TagsModule } from 'app/ngrx/tags';
import { AuthModule } from 'app/ngrx/auth';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./ngrx/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./ngrx/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./views/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.ResourceAccountModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: false
    }),
    TranslateModule.forRoot(),
    LayoutModule,
    RootModule.forRoot(rootConfig),
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true,
      //   strictStateSerializability: true,
      //   strictActionSerializability: true,
      // },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx E Commerce App',
      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }),
    EffectsModule.forRoot([RouterEffects]),
    NgrxCoreModule,
    RootSharedModule,
    RootProgressBarModule,
    ProductsModule,
    CheckoutModule,
    TagsModule,
    AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
