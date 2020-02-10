import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { LoginModalService, AccountService, LoginService } from '@eps/services/core';
import { Observable } from "rxjs/Observable";
import { Account, Wishlists, Compares, IProducts } from '@eps/models';
import { Subscription } from "rxjs/Subscription";
import { Store, select } from "@ngrx/store";
import * as fromProduct from 'app/ngrx/products/reducers';
import { WishlistActions,CompareActions } from 'app/ngrx/products/actions';
import { RootConfigService } from '@eps/services';
import { RootSidebarService } from '@eps/components/sidebar/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  account: Account;
  modalRef: NgbModalRef;
  wishlistCount$: Observable<number>;
  compareCount$: Observable<number>;
  isCollapsed: boolean = true;

  rootConfig: any;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];

  isNavbarCollapsed = true;

  private _unsubscribeAll: Subject<any>;
  private subscriptions: Subscription[] = [];
  constructor(
    private _rootConfigService: RootConfigService,
    private _rootSidebarService: RootSidebarService,
    // private _translateService: TranslateService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private store: Store<fromProduct.State>,
    private _platform: Platform
  ) {
    this.wishlistCount$ = store.pipe(select(fromProduct.getWishlistCount)) as Observable<number>;
    this.compareCount$ = store.pipe(select(fromProduct.getCompareCount)) as Observable<number>;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }

    const configSubscription = this._rootConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.rootConfig = settings;
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });
    this.subscriptions.push(configSubscription);
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();

    // Set the selected language from default languages
    // this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });    
  }

  registerAuthenticationSuccess() {
    const eventSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        if (account) {
          this.account = account;
          console.log('auth success')
          this.store.dispatch(WishlistActions.loadWishlist());
          this.store.dispatch(CompareActions.loadCompare());
        }
      });
    });
    this.subscriptions.push(eventSubscription);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
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
