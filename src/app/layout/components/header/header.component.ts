import { Component, ChangeDetectionStrategy, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AccountService } from '@root/services/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IShoppingCarts } from '@root/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { CartActions } from 'app/ngrx/checkout/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerNav', { static: false }) headerNav: ElementRef;
  isMobile: boolean;
  totalQuantity$: Observable<number>;

  constructor(
    private _platform: Platform,
    private store: Store<fromCheckout.State>,
    private accountService: AccountService
  ) {
    this.totalQuantity$ = store.pipe(select(fromCheckout.getCartTotalQuantity)) as Observable<number>;
  }

  ngOnInit() {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }
    this.store.dispatch(CartActions.fetchCart());
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: Event): void {
  //   if (this.isMobile) {
  //     if (window.pageYOffset >= 100) {
  //       this.headerNav.nativeElement.classList.add('bg-dark');
  //     }
  //     else {
  //       this.headerNav.nativeElement.classList.remove('bg-dark');
  //     }
  //   }
  // }
}
