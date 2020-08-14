import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import {
  SelectedStockItemPageActions,
  CompareActions,
  WishlistActions,
  FetchActions,
  ProductActions,
  ProductDetailsActions,
} from 'app/ngrx/products/actions';
import { CartActions } from 'app/ngrx/checkout/actions';
import { Account, IProducts, IStockItems } from '@vertical/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import { AccountService, AuthService } from '@vertical/core';
// import { LoginModalService } from '@vertical/services/core/login/login-modal.service';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'selected-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-product-page.component.html',
  styleUrls: ['./selected-product-page.component.scss'],
})
export class SelectedProductPageComponent implements OnInit, OnDestroy {
  product$: Observable<IProducts>;
  // stockItems$: Observable<IStockItems[]>;
  account: Account | null = null;
  isSelectedStockItemInCompare$: Observable<boolean>;
  isSelectedStockItemInWishlist$: Observable<boolean>;
  isSelectedStockItemInCart$: Observable<boolean>;
  modalRef: NgbModalRef;
  compareStockItems$: Observable<IStockItems[]>;
  compareStockItems: IStockItems[];
  productDetails$: Observable<any>;
  productDetailsLoading$: Observable<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromProducts.State>,
    private accountService: AccountService,
    // private loginModalService: LoginModalService,
    private checkoutStore: Store<fromCheckout.State>,
    private authService: AuthService,
    private msg: NzMessageService,
    route: ActivatedRoute
  ) {
    this.product$ = store.pipe(select(fromProducts.getSelectedProduct));

    // this.stockItems$ = store.pipe(select(fromProducts.getFetchStockItems));
    this.isSelectedStockItemInCompare$ = store.pipe(select(fromProducts.isSelectedStockItemInCompare));
    this.isSelectedStockItemInWishlist$ = store.pipe(select(fromProducts.isSelectedStockItemInWishlist));
    this.isSelectedStockItemInCart$ = checkoutStore.pipe(select(fromCheckout.isSelectedStockItemInCart));
    this.compareStockItems$ = store.pipe(select(fromProducts.getCompareStockItems));
    // this.isSelectedStockItemInCart$.subscribe(data => console.log('in cart sub', data));

    this.productDetails$ = store.pipe(select(fromProducts.getProductDetails));
    this.productDetailsLoading$ = store.pipe(select(fromProducts.getProductDetailsLoading));
    const actionsSubscription = route.params
      .pipe(map(params => CartActions.selectProduct({ id: params.id })))
      .subscribe(action => this.checkoutStore.dispatch(action));
    this.subscriptions.push(actionsSubscription);
  }

  ngOnInit(): void {
    this.product$.subscribe(item => {
      if (item && item.id) {
        this.store.dispatch(ProductDetailsActions.fetchProductDetails({ id: item.id }));
        // this.store.dispatch(FetchActions.fetchStockItems({ productId: item.id }));
        // this.store.dispatch(FetchActions.fetchReviewsDetails({ productId: item.id }));
      }
    });

    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;
      if (account) {
        this.store.dispatch(CompareActions.loadCompare());
        this.store.dispatch(WishlistActions.loadWishlist());
      }
    });

    this.productDetails$.subscribe(res => {
      console.log('res?.productDetails', res);
      if (res?.stockItemLists.length > 0) {
        this.store.dispatch(ProductActions.selectStockItem({ stockItem: res?.stockItemLists[0] }));
      }
    });

    this.compareStockItems$.subscribe(res => (this.compareStockItems = res));
  }

  addToCompare(stockItem: IStockItems): void {
    if (this.compareStockItems && this.compareStockItems.length < 10) {
      this.store.dispatch(SelectedStockItemPageActions.addStockItemToCompare({ stockItem }));
    } else {
      this.msg.warning('You have reached the maximum number of compare list.');
    }
  }

  removeFromCompare(stockItem: IStockItems): void {
    this.store.dispatch(SelectedStockItemPageActions.removeStockItemFromCompare({ stockItem }));
  }

  addToWishlist(stockItem: IStockItems): void {
    this.store.dispatch(SelectedStockItemPageActions.addStockItemToWishlist({ stockItem }));
  }

  removeFromWishlist(stockItem: IStockItems): void {
    this.store.dispatch(SelectedStockItemPageActions.removeStockItemFromWishlist({ stockItem }));
  }

  // reduceFromCart(event) {
  //   this.store.dispatch(CartActions.reduceFromCart({ props: event }));
  // }

  // removeFromCart(productId) {
  //   this.store.dispatch(CartActions.removeFromCart(productId));
  // }

  addToCart(event): void {
    if (this.isAuthenticated()) {
      this.store.dispatch(CartActions.addToCart({ props: event }));
    } else {
      this.login();
    }
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    // this.modalRef = this.loginModalService.open();
    this.authService.login();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      if (el) {
        el.unsubscribe();
      }
    });
  }
}
