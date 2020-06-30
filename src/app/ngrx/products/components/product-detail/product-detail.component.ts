import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { IProducts, AddToCartProps, IStockItems, IPhotos, IReviewLines, IQuestions, IOrderLines } from '@eps/models';
import { AccountService } from '@eps/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions, ProductActions } from 'app/ngrx/products/actions';
import { select, Store } from '@ngrx/store';
import { SERVER_API_URL } from '@eps/constants';
import { IProductDocument } from '@eps/models/product-document.model';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() product: IProducts;
  @Input() inCompare: boolean;
  @Input() inWishlist: boolean;
  @Input() inCart: boolean;
  @Input() productDetails: any;
  @Input() productDetailsLoading: boolean;
  @Output() addToCompare = new EventEmitter<IProducts>();
  @Output() removeFromCompare = new EventEmitter<IProducts>();
  @Output() addToWishlist = new EventEmitter<IProducts>();
  @Output() removeFromWishlist = new EventEmitter<IProducts>();
  @Output() addCart = new EventEmitter<AddToCartProps>();

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  quantity = 1;
  actionsSubscription: Subscription;
  questions$: Observable<IQuestions[]>;
  relatedProducts$: Observable<IProducts[]>;
  stockItem$: Observable<IStockItems>;
  relatedProductsLoading$: Observable<boolean>;
  error$: Observable<string>;
  show = false;
  allRatingCount = 0;

  currentStockItem: any;

  constructor(
    private accountService: AccountService,
    private store: Store<fromProducts.State>,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.actionsSubscription = route.params
      .pipe(map(params => FetchActions.fetchRelated({ id: params.id })))
      .subscribe(action => store.dispatch(action));

    this.stockItem$ = this.store.pipe(select(fromProducts.getSelectedStockItem));
    this.relatedProducts$ = this.store.pipe(select(fromProducts.getRelatedProducts));
    this.relatedProductsLoading$ = this.store.pipe(select(fromProducts.getRelatedProductsLoading));
    this.questions$ = this.store.pipe(select(fromProducts.getQuestions));
    this.error$ = this.store.pipe(select(fromProducts.getFetchError));
  }

  ngOnInit(): void {
    this.stockItem$.subscribe(stockItem => (this.currentStockItem = stockItem));
  }

  ngOnChanges(): void {}

  onChangeStockItem(stockItem: any): void {
    if (stockItem && stockItem.id) {
      this.store.dispatch(ProductActions.selectStockItem({ stockItem }));
    }
  }

  toggleCompare(event, inCompare): void {
    if (inCompare) {
      this.removeFromCompare.emit(event);
    } else {
      this.addToCompare.emit(event);
    }
  }

  toggleWishlist(stockItem, inWishlist): void {
    if (inWishlist) {
      this.removeFromWishlist.emit(stockItem);
    } else {
      this.addToWishlist.emit(stockItem);
    }
  }

  addToCart(stockItem: IStockItems): void {
    const props: AddToCartProps = {
      id: stockItem.id,
      quantity: this.quantity,
    };

    this.addCart.emit(props);
  }

  buyNow(stockItem: IStockItems, existInCart: boolean): void {
    const props: AddToCartProps = {
      id: stockItem.id,
      quantity: this.quantity,
    };

    if (!existInCart) {
      this.addCart.emit(props);
    }

    this.router.navigate(['/checkout/cart']);
  }

  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }
}
