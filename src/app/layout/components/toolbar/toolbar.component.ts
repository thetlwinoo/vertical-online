import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginModalService, AccountService, LoginService } from '@root/services/core';
import { Observable } from "rxjs/Observable";
import { Account, Wishlists, Compares } from '@root/models';
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/ngrx/app.reducers';
import { HttpError } from 'app/ngrx/app.reducers';
import * as WishlistActions from 'app/ngrx/wishlist/wishlist.actions';
import * as CompareActions from 'app/ngrx/compare/compare.actions';
import { RootConfigService } from '@root/services';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';
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
  wishlistState: Observable<{ wishlists: Wishlists, errors: HttpError[], loading: boolean }>;
  compareState: Observable<{ compares: Compares, errors: HttpError[], loading: boolean }>;
  isCollapsed: boolean = true;

  rootConfig: any;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  wishlistCount: number = 0;
  compareCount: number = 0;

  isNavbarCollapsed = true;

  private _unsubscribeAll: Subject<any>;
  private subscriptions: Subscription[] = [];
  constructor(
    private _rootConfigService: RootConfigService,
    private _rootSidebarService: RootSidebarService,
    private _translateService: TranslateService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private store: Store<fromApp.AppState>,
    private _platform: Platform
  ) {
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
    this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });

    this.wishlistState = this.store.select('wishlist');
    const wishlistSubscription = this.wishlistState.subscribe(data => {
      if (data && data.wishlists && data.wishlists.wishlistLists) {
        this.wishlistCount = data.wishlists.wishlistLists.length;
      }
      else {
        this.wishlistCount = 0;
      }
    });
    this.subscriptions.push(wishlistSubscription);

    this.compareState = this.store.select('compare');
    const compareSubscription = this.compareState.subscribe(data => {
      if (data && data.compares && data.compares.compareLists) {
        this.compareCount = data.compares.compareLists.length;
      } else {
        this.compareCount = 0;
      }
    });
    this.subscriptions.push(compareSubscription);
  }

  registerAuthenticationSuccess() {
    const eventSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        if (account) {
          this.account = account;
          this.store.dispatch(new WishlistActions.FetchWishlist());
          this.store.dispatch(new CompareActions.FetchCompare());
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
    this._translateService.use(lang.id);
  }
}
