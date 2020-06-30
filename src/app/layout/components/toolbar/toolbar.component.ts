/* eslint-disable dot-notation */
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { AccountService, AuthService } from '@eps/core';
import { Observable } from 'rxjs/Observable';
import { Account, Wishlists, Compares, IProducts, IPeople } from '@eps/models';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import * as fromProduct from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { WishlistActions, CompareActions } from 'app/ngrx/products/actions';
import { PeopleActions, CustomerActions } from 'app/ngrx/auth/actions';
import { CartActions } from 'app/ngrx/checkout/actions';
import { RootConfigService } from '@eps/services';
import { RootSidebarService } from '@eps/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { Platform } from '@angular/cdk/platform';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  account: Account | null = null;
  modalRef: NgbModalRef;
  wishlistCount$: Observable<number>;
  compareCount$: Observable<number>;
  people$: Observable<IPeople>;
  isCollapsed = true;

  rootConfig: any;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];

  isNavbarCollapsed = true;

  private unsubscribe$: Subject<any> = new Subject();
  private subscriptions: Subscription[] = [];
  constructor(
    private _rootConfigService: RootConfigService,
    private _rootSidebarService: RootSidebarService,
    // private _translateService: TranslateService,
    private accountService: AccountService,
    private authService: AuthService,
    // private loginService: LoginService,
    private router: Router,
    // private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private store: Store<fromProduct.State>,
    private authStore: Store<fromAuth.State>,
    protected keycloakAngular: KeycloakService,
    private _platform: Platform
  ) {
    this.wishlistCount$ = store.pipe(select(fromProduct.getWishlistCount));
    this.compareCount$ = store.pipe(select(fromProduct.getCompareCount));
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
  }

  ngOnInit(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }

    const configSubscription = this._rootConfigService.config.pipe(takeUntil(this.unsubscribe$)).subscribe(settings => {
      this.rootConfig = settings;
      this.horizontalNavbar = settings.layout.navbar.position === 'top';
      this.rightNavbar = settings.layout.navbar.position === 'right';
      this.hiddenNavbar = settings.layout.navbar.hidden === true;
    });
    this.subscriptions.push(configSubscription);
    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
      if (account) {
        this.store.dispatch(CartActions.fetchCart());
        this.store.dispatch(WishlistActions.loadWishlist());
        this.store.dispatch(CompareActions.loadCompare());
        this.authStore.dispatch(PeopleActions.fetchLoginPeople({ id: this.account.id }));
      }
    });

    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(people => {
      if (people) {
        this.authStore.dispatch(CustomerActions.fetchCustomer({ id: people.id }));
      }
    });
    // try {
    //   // eslint-disable-next-line @typescript-eslint/quotes
    //   const userDetails = this.keycloakAngular.getKeycloakInstance().tokenParsed;
    //   console.log('userDetails', userDetails);
    // } catch (e) {
    //   console.log('Failed to load user details', e);
    // }

    // this.registerAuthenticationSuccess();

    // Set the selected language from default languages
    // this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
  }

  // registerAuthenticationSuccess() {
  //   const eventSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
  //     this.accountService.identity().subscribe(account => {
  //       if (account) {
  //         this.account = account;
  //         this.store.dispatch(WishlistActions.loadWishlist());
  //         this.store.dispatch(CompareActions.loadCompare());
  //       }
  //     });
  //   });
  //   this.subscriptions.push(eventSubscription);
  // }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.authService.login();
    // this.modalRef = this.loginModalService.open();
  }

  logout(): void {
    this.authService.logout();
    // this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.subscriptions.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }

  toggleSidebarOpen(key): void {
    this._rootSidebarService.getSidebar(key).toggleOpen();
  }

  search(value): void {
    console.log(value);
  }

  setLanguage(lang): void {
    this.selectedLanguage = lang;
    // this._translateService.use(lang.id);
  }
}
