import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Cart } from "app/ngrx/cart/cart.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import * as fromApp from "app/ngrx/app.reducers";
import { HttpError } from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import * as CartActions from "app/ngrx/cart/cart.actions";
import * as OrderActions from "app/ngrx/order/order.actions";
import * as AuthActions from "app/ngrx/auth/auth.actions";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.scss']
})
export class DisplayCartComponent implements OnInit, OnDestroy {

  cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;

  cartPriceSubscription: Subscription;
  cartPrice: number;

  applyCodeShow: boolean = false;


  constructor(private store: Store<fromApp.AppState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.cartState = this.store.select('cart');
    this.cartPriceSubscription = this.cartState.subscribe(
      (data) => {
        // console.log('cart state')
        let cp = 0;

        if (data.cart.cartItemLists) {
          for (let i = 0; i < data.cart.cartItemLists.length; i++) {
            const product = data.cart.cartItemLists[i].product;
            cp = cp + (product.unitPrice * data.cart.cartItemLists[i].quantity);
          }
        }

        this.cartPrice = cp;
      }
    );
  }

  ngOnDestroy() {
    if (this.cartPriceSubscription != null) {
      this.cartPriceSubscription.unsubscribe();
    }
  }

  applyCode(discountCodeField: HTMLInputElement) {
    const discountCode = discountCodeField.value;
    this.store.dispatch(new CartActions.ApplyDiscount(discountCode));

  }

  addToCart(productId,quantity) {
    this.store.dispatch(new CartActions.AddToCart({ id: productId, quantity: parseInt(quantity) }));
  }

  reduceFromCart(id,quantity) {
    this.store.dispatch(new CartActions.ReduceFromCart({ id: id, quantity: parseInt(quantity) }));
  }

  goToItem(id) {
    this.router.navigate(['/detail/', id], { relativeTo: this.route });
  }

  removeFromCart(productId) {
    this.store.dispatch(new CartActions.RemoveFromCart(productId));
  }

  activatePurchase() {
    // this.store.select('auth')
    //   .take(1)
    //   .subscribe(data => {
    //     if (data.isActive) {
    //       this.store.dispatch(new OrderActions.IsPurchaseActive(true));
    //       this.router.navigate(['form'], { relativeTo: this.route });
    //     } else {
    //       this.store.dispatch(new AuthActions.FetchVerificationStatus());
    //       alert("Your account is inactive. You must activate your account in order to purchase.\nPlease check your email.");
    //     }
    //   });
    this.store.dispatch(new OrderActions.IsPurchaseActive(true));
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  proceedToCheckout() {
    // this.store.select('auth')
    //   .take(1)
    //   .subscribe(data => {
    //     if (data.isActive) {
    //       this.store.dispatch(new OrderActions.IsPurchaseActive(true));
    //       this.router.navigate(['form'], { relativeTo: this.route });
    //     } else {
    //       this.store.dispatch(new AuthActions.FetchVerificationStatus());
    //       alert("Your account is inactive. You must activate your account in order to purchase.\nPlease check your email.");
    //     }
    //   });
    // this.store.dispatch(new OrderActions.IsPurchaseActive(true));
    this.router.navigate(['form'], { relativeTo: this.route });
  }
}
