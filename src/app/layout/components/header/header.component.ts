import { Component, ChangeDetectionStrategy, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AccountService } from '@vertical/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IShoppingCarts } from '@vertical/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerNav', { static: false }) headerNav: ElementRef;
  isMobile: boolean;
  totalQuantity$: Observable<number>;
  itemCount$: Observable<number>;

  constructor(private _platform: Platform, private store: Store<fromCheckout.State>, private accountService: AccountService) {
    this.totalQuantity$ = store.pipe(select(fromCheckout.getCartTotalQuantity));
    // this.itemCount$ = store.pipe(select(fromCheckout.getCartItemCount));
  }

  ngOnInit(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }
    // this.store.dispatch(CartActions.fetchCart());
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: Event): void {
  //   if (this.isMobile) {
  //     if (window.pageYOffset >= 100) {
  //       this.headerNav.nativeElement.classList.add('bg-primary');
  //     }
  //     else {
  //       this.headerNav.nativeElement.classList.remove('bg-primary');
  //     }
  //   }
  // }
}
