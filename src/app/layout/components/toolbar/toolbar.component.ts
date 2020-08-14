/* eslint-disable dot-notation */
import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { AccountService, AuthService } from '@vertical/core';
import { Observable } from 'rxjs/Observable';
import { Account, Wishlists, Compares, IProducts, IPeople, ICustomers, IOrders } from '@vertical/models';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import * as fromProduct from 'app/ngrx/products/reducers';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { WishlistActions, CompareActions } from 'app/ngrx/products/actions';
import { PeopleActions, CustomerActions } from 'app/ngrx/auth/actions';
import { CartActions, OrderActions } from 'app/ngrx/checkout/actions';
import { RootConfigService } from '@vertical/services';
import { RootSidebarService } from '@vertical/components/sidebar/sidebar.service';
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
  people: IPeople;
  customer$: Observable<ICustomers>;
  orders$: Observable<IOrders[]>;
  orders: IOrders[];
  ordersLoading$: Observable<boolean>;
  ordersLoading = false;
  customer: ICustomers;
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

  constructor(
    private _rootConfigService: RootConfigService,
    private _rootSidebarService: RootSidebarService,
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private eventManager: JhiEventManager,
    private store: Store<fromProduct.State>,
    private authStore: Store<fromAuth.State>,
    private checkoutStore: Store<fromCheckout.State>,
    protected keycloakAngular: KeycloakService,
    private _platform: Platform,
    private cdRef: ChangeDetectorRef
  ) {
    this.wishlistCount$ = store.pipe(select(fromProduct.getWishlistCount));
    this.compareCount$ = store.pipe(select(fromProduct.getCompareCount));
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
    this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));
    this.orders$ = checkoutStore.pipe(select(fromCheckout.getTrackOrderFetched));
    this.ordersLoading$ = checkoutStore.pipe(select(fromCheckout.getOrderLoading));
  }

  ngOnInit(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }

    this.ordersLoading$.pipe(takeUntil(this.unsubscribe$)).subscribe(loading => {
      this.ordersLoading = loading;
      this.cdRef.detectChanges();
    });

    this._rootConfigService.config.pipe(takeUntil(this.unsubscribe$)).subscribe(settings => {
      this.rootConfig = settings;
      this.horizontalNavbar = settings.layout.navbar.position === 'top';
      this.rightNavbar = settings.layout.navbar.position === 'right';
      this.hiddenNavbar = settings.layout.navbar.hidden === true;
    });

    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
      console.log('account', this.account);
      if (account) {
        this.store.dispatch(CartActions.fetchCart());
        this.store.dispatch(WishlistActions.loadWishlist());
        this.store.dispatch(CompareActions.loadCompare());
        this.authStore.dispatch(PeopleActions.fetchLoginPeople({ query: { 'userId.equals': this.account.id } }));
      }
    });

    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(people => {
      this.people = people;
    });

    this.customer$.pipe(takeUntil(this.unsubscribe$)).subscribe(customer => {
      this.customer = customer;
    });

    this.orders$.pipe(takeUntil(this.unsubscribe$)).subscribe(orders => (this.orders = orders));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.authService.login();
  }

  register(): void {
    this.authService.register();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  onGoOrderDetails(orderNumber: string): void {
    const orderId = this.orders.find(x => x.customerPurchaseOrderNumber === orderNumber).id;
    this.router.navigate(['/pages/dashboard/my-orders', orderId, 'view']);
  }
}
