// import 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { rootConfig } from 'app/root-config';
import { NgModule } from '@angular/core';
import { NgrxModule } from 'app/ngrx/ngrx.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from 'app/layout/layout.module';
import { RootSharedModule } from '@root/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { RootModule } from '@root/root.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '@root/blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from '@root/blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from '@root/blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '@root/blocks/interceptor/notification.interceptor';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { RootProgressBarModule } from '@root/components';
import './vendor.ts';
import 'hammerjs';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule'
  },
  {
    path: 'products',
    loadChildren: './views/products/products.module#ProductsModule'
  },
  {
    path: 'pages',
    loadChildren: './views/pages/pages.module#PagesModule'
  },
  {
    path: 'auth',
    loadChildren: './views/auth/auth.module#AuthModule'
  },
  {
    path: 'checkout',
    loadChildren: './views/checkout/checkout.module#CheckoutModule'
  },
  {
    path: 'search',
    loadChildren: './views/search/search.module#SearchModule'
  },
  {
    path: 'account',
    loadChildren: './account/account.module#ResourceAccountModule'
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
    BrowserModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    RouterModule.forRoot(routes),
    TranslateModule.forRoot(),
    RootModule.forRoot(rootConfig),
    HttpClientModule,
    LayoutModule,
    NgrxModule,
    RootSharedModule,
    RootProgressBarModule
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
