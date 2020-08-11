// import 'bootstrap';
import { NgModule, DoBootstrap, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { rootConfig } from 'app/root-config';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from 'app/layout/layout.module';
import { RootSharedModule } from '@eps/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { RootModule } from '@eps/root.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { RootProgressBarModule } from '@eps/components/progress-bar/progress-bar.module';
import { ROOT_REDUCERS, metaReducers } from 'app/ngrx';
import { NgrxCoreModule } from 'app/ngrx/core';
import { RouterEffects } from 'app/ngrx/core/effects';
import 'hammerjs';
import { ProductsModule } from 'app/ngrx/products';
import { CheckoutModule } from 'app/ngrx/checkout';
import { TagsModule } from 'app/ngrx/tags';
import { AuthModule } from 'app/ngrx/auth';

import { CoreModule } from '@eps/core/core.module';
import { environment } from '../environments/environment';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HomeModule } from './views/home/home.module';

const keycloakService: KeycloakService = new KeycloakService();

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  // },
  {
    path: 'products',
    loadChildren: () => import('./ngrx/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./ngrx/checkout/checkout.module').then(m => m.CheckoutModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./views/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'register-success',
    loadChildren: () => import('./views/register-success/register-success.module').then(m => m.RegisterSuccessModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HomeModule,
    KeycloakAngularModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: false,
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
    AuthModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializer,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
  ],
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(appRef: ApplicationRef): Promise<void> {
    const { keycloak } = environment;

    await keycloakService
      .init({
        config: keycloak,
        initOptions: {
          // onLoad: 'login-required',
          onLoad: 'check-sso',
          checkLoginIframe: false,
          flow: 'implicit',
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/clients/public'],
      })
      .then(auth => {
        console.log('[ngDoBootstrap] bootstrap app', auth);

        if (auth && !keycloakService.isUserInRole('ROLE_CUSTOMER')) {
          keycloakService.logout();
        }
        // keycloakService.updateToken(180);
        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[ngDoBootstrap] init Keycloak failed', error));
  }
}
