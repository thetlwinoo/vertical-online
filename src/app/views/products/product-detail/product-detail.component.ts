import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ProductDetailService } from '@root/services';
import { Wishlists, Compares, Products, IProducts } from '@root/models';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from 'app/ngrx/app.reducers';
import { HttpError } from 'app/ngrx/app.reducers';
import * as CartActions from 'app/ngrx/cart/cart.actions';
import * as WishlistActions from 'app/ngrx/wishlist/wishlist.actions';
import * as CompareActions from 'app/ngrx/compare/compare.actions';
import * as PhotoActions from 'app/ngrx/photo/photo.actions';
import { Cart, Product } from "app/ngrx/cart/cart.reducer";
import { Observable } from "rxjs/Observable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocationStrategy } from "@angular/common";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { AccountService } from '@root/services/core/auth/account.service';
import { LoginModalService } from '@root/services/core/login/login-modal.service';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from "rxjs/Subscription";
import { ProductService, ProductPhotoService } from '@root/services';
import 'rxjs/add/operator/filter';
import { CommaExpr } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  paramSubscription: Subscription;
  routerSubscription: Subscription;
  wishlistSubscription: Subscription;
  fetchError: HttpErrorResponse = null;
  account: Account;
  images: any;
  product: Product;
  products: Product[];
  public counter: number = 1;
  cartState: Observable<{ cart: Cart, errors: HttpError[], loading: boolean }>;
  wishlistState: Observable<{ wishlists: Wishlists, isInWishlist: boolean, errors: HttpError[], loading: boolean }>;
  compareState: Observable<{ compares: Compares, isInCompare: boolean, errors: HttpError[], loading: boolean }>;
  photoState: Observable<{ photos: any[], images: any[], errors: HttpError[], loading: boolean }>;
  inlineLoading: boolean = true;
  modalRef: NgbModalRef;
  id: number;
  isPopState = false;
  rating: number = 4;
  isInWishlist: boolean = false;
  isInCompare: boolean = false;
  // wishlistList: any;  
  // isWishlistFetched: boolean = false;

  constructor(
    private router: Router,
    // private productDetailService: ProductDetailService,
    private loginModalService: LoginModalService,
    private locStrat: LocationStrategy,
    private store: Store<fromApp.AppState>,
    private accountService: AccountService,
    private modalService: NgbModal,
    private eventManager: JhiEventManager,
    private route: ActivatedRoute,
    private productService: ProductService,
    private productPhotoService: ProductPhotoService,
    // private wishlistService: WishlistService
  ) {
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && !this.isPopState) {
        // window.scrollTo(0, 0);
        this.isPopState = false;
      }

      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });

    this.cartState = this.store.select('cart');
    this.wishlistState = this.store.select('wishlist');
    this.compareState = this.store.select('compare');
    this.photoState = this.store.select('photos');

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.inlineLoading = true;
        this.productService.getFullProduct(this.id).pipe(
          filter((response: HttpResponse<Products>) => response.ok),
          map((response: HttpResponse<Products>) => response.body))
          .subscribe(
            (data: any) => {
              this.product = data;
              this.inlineLoading = false;
            }
          );

        console.log('id', params['id']);
        this.store.dispatch(new PhotoActions.FetchPhotos(params['id']));

        if (this.isAuthenticated()) {
          this.store.dispatch(new WishlistActions.CheckInWishlist(params['id']));
          this.store.dispatch(new CompareActions.CheckInCompare(params['id']));
        }
      }
    );

    this.wishlistState.subscribe(data => {
      this.isInWishlist = data.isInWishlist;
      console.log('check in list status', data.isInWishlist);
    });

    this.compareState.subscribe(data => {
      this.isInCompare = data.isInCompare;
    });
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  buyNow(amount: HTMLInputElement) {
    this.addToCart(amount);
    this.router.navigate(['/checkout']);
  }

  addToCart(amount: HTMLInputElement) {
    const val = amount.value;
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(val) || parseInt(val) == 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (this.isAuthenticated()) {
      this.store.dispatch(new CartActions.AddToCart({ id: this.product.id, quantity: parseInt(val) }));
    }
    else {
      this.login();
    }
  }

  onShareVia(event) {
    console.log(event);
  }

  toggleWishlist(event) {
    if (this.isInWishlist) this.removeFromWishlist();
    else this.addToWishlist();
  }

  addToWishlist() {
    if (this.isAuthenticated()) {
      this.store.dispatch(new WishlistActions.AddToWishlist(this.product.id));
    }
    else {
      this.login();
    }
  }

  removeFromWishlist() {
    if (this.isAuthenticated()) {
      this.store.dispatch(new WishlistActions.RemoveFromWishlist(this.product.id));
    }
    else {
      this.login();
    }
  }

  toggleCompare(event) {
    if (this.isInCompare) this.removeFromCompare();
    else this.addToCompare();
  }

  addToCompare() {
    if (this.isAuthenticated()) {
      this.store.dispatch(new CompareActions.AddToCompare(this.product.id));
    }
    else {
      this.login();
    }
  }

  removeFromCompare() {
    if (this.isAuthenticated()) {
      this.store.dispatch(new CompareActions.RemoveFromCompare(this.product.id));
    }
    else {
      this.login();
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  protected onError(errorMessage: string) {
    console.log(errorMessage);
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe();
    }
    if (this.routerSubscription != null) {
      this.routerSubscription.unsubscribe();
    }

    if (this.wishlistSubscription != null) {
      this.wishlistSubscription.unsubscribe();
    }
  }
}
