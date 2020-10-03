import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { AccountService } from '@vertical/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  }

  ngOnInit(): void {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
}
