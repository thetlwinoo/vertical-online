import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs/Subscription";
import { SelectedProductPageActions, CompareActions, WishlistActions } from 'app/ngrx/products/actions';
import { CartActions } from 'app/ngrx/checkout/actions';
import { IProducts, AddToCartProps } from '@eps/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import { AccountService } from '@eps/services/core/auth/account.service';
import { LoginModalService } from '@eps/services/core/login/login-modal.service';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'selected-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-product-page.component.html',
  styleUrls: ['./selected-product-page.component.scss']
})
export class SelectedProductPageComponent {
  product$: Observable<IProducts>;
  isSelectedProductInCompare$: Observable<boolean>;
  isSelectedProductInWishlist$: Observable<boolean>;
  isSelectedProductInCart$: Observable<boolean>;
  modalRef: NgbModalRef;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromProducts.State>,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private checkoutStore: Store<fromCheckout.State>,
    route: ActivatedRoute
  ) {
    this.product$ = store.pipe(select(fromProducts.getSelectedProduct)) as Observable<IProducts>;
    this.isSelectedProductInCompare$ = store.pipe(select(fromProducts.isSelectedProductInCompare));
    this.isSelectedProductInWishlist$ = store.pipe(select(fromProducts.isSelectedProductInWishlist));
    this.isSelectedProductInCart$ = checkoutStore.pipe(select(fromCheckout.isSelectedProductInCart));

    this.isSelectedProductInCart$.subscribe(data => console.log('in cart sub', data))

    const actionsSubscription = route.params
      .pipe(map(params => CartActions.selectProduct({ id: params.id })))
      .subscribe(action => this.checkoutStore.dispatch(action));
    this.subscriptions.push(actionsSubscription)
  }

  ngOnInit() {
    this.store.dispatch(CompareActions.loadCompare());
    this.store.dispatch(WishlistActions.loadWishlist());
  }

  addToCompare(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.addProductToCompare({ product }));
  }

  removeFromCompare(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.removeProductFromCompare({ product }));
  }

  addToWishlist(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.addProductToWishlist({ product }));
  }

  removeFromWishlist(product: IProducts) {
    this.store.dispatch(SelectedProductPageActions.removeProductFromWishlist({ product }));
  }

  // reduceFromCart(event) {
  //   this.store.dispatch(CartActions.reduceFromCart({ props: event }));
  // }

  // removeFromCart(productId) {
  //   this.store.dispatch(CartActions.removeFromCart(productId));
  // }

  addToCart(event) {
    if (this.isAuthenticated()) {
      this.store.dispatch(CartActions.addToCart({ props: event }));
    }
    else {
      this.login();
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }
}
