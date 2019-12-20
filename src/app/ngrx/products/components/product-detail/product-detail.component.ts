import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProducts, AddToCartProps } from '@epm/models';
import { AccountService } from '@epm/services/core/auth/account.service';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: IProducts;
  @Input() inCompare: boolean;
  @Input() inWishlist: boolean;
  @Input() inCart: boolean;
  @Output() addToCompare = new EventEmitter<IProducts>();
  @Output() removeFromCompare = new EventEmitter<IProducts>();
  @Output() addToWishlist = new EventEmitter<IProducts>();
  @Output() removeFromWishlist = new EventEmitter<IProducts>();
  @Output() addCart = new EventEmitter<AddToCartProps>();

  actionsSubscription: Subscription;
  relatedProducts$: Observable<IProducts[]>;
  relatedProductsLoading$: Observable<boolean>;
  error$: Observable<string>;
  constructor(
    private accountService: AccountService,
    private store: Store<fromProducts.State>,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.actionsSubscription = route.params
    .pipe(map(params => FetchActions.fetchRelated({ id: params.id })))
    .subscribe(action => store.dispatch(action));
  }

  ngOnInit() {
    this.relatedProducts$ = this.store.pipe(select(fromProducts.getFetchRelatedProducts)) as Observable<IProducts[]>;
    this.relatedProductsLoading$ = this.store.pipe(select(fromProducts.getFetchRelatedProductsLoading));
    this.error$ = this.store.pipe(select(fromProducts.getFetchError));
  }

  toggleCompare(event, inCompare) {
    if (inCompare) {
      this.removeFromCompare.emit(event);
    } else {
      this.addToCompare.emit(event);
    }
  }

  toggleWishlist(event, inWishlist) {
    if (inWishlist) {
      this.removeFromWishlist.emit(event);
    } else {
      this.addToWishlist.emit(event);
    }
  }

  addToCart(product: IProducts, amount: HTMLInputElement) {
    const quantity = amount.value;
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(quantity) || parseInt(quantity) == 0) {
      alert("Please enter a valid amount.");
      return;
    }

    let props: AddToCartProps = {
      id: product.id,
      quantity: parseInt(quantity)
    };

    this.addCart.emit(props);
  }

  buyNow(product: IProducts, amount: HTMLInputElement, existInCart: boolean) {
    const quantity = amount.value;
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(quantity) || parseInt(quantity) == 0) {
      alert("Please enter a valid amount.");
      return;
    }

    let props: AddToCartProps = {
      id: product.id,
      quantity: parseInt(quantity)
    };

    if (!existInCart) {
      this.addCart.emit(props);
    }

    this.router.navigate(['/checkout/cart']);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
