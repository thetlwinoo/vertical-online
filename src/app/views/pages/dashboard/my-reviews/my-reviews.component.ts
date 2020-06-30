import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { IProducts, IOrders } from '@eps/models';
import { ReviewsService, OrderService, OrderLinesService } from '@eps/services';
import { AccountService } from '@eps/core';
import { SERVER_API_URL } from '@eps/constants';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
// import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { OrderActions } from 'app/ngrx/checkout/actions';
import * as fromCheckout from 'app/ngrx/checkout/reducers';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss'],
})
export class MyReviewsComponent implements OnInit, OnDestroy {
  orders$: Observable<IOrders[]>;
  orderLoading$: Observable<boolean>;
  orders: IOrders[];

  currentAccount: any;
  eventSubscriber: Subscription;
  completedReview = false;
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    protected reviewsService: ReviewsService,
    protected ordersService: OrderService,
    protected orderLinesService: OrderLinesService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private store: Store<fromCheckout.State>,
    private router: Router
  ) {
    this.orders$ = store.pipe(select(fromCheckout.getOrderFetched));
    this.orderLoading$ = store.pipe(select(fromCheckout.getOrderLoading));
  }

  loadAll(): void {
    this.store.dispatch(OrderActions.fetchOrder(null));
  }

  ngOnInit(): void {
    this.loadAll();

    this.accountService
      .identity()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(account => {
        if (account) {
          this.currentAccount = account;
        }
      });

    this.orders$.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.orders = res;
    });

    // this.registerChangeInReviews();
  }

  ngOnDestroy(): void {
    // this.eventManager.destroy(this.eventSubscriber);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackId(index: number, item: IProducts): number {
    return item.id;
  }

  byteSize(field): string {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field): void {
    return this.dataUtils.openFile(contentType, field);
  }

  // registerChangeInReviews(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('reviewsListModification', response => this.loadAll());
  // }

  onClickReview(orderId: number): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { orderId },
      // fragment: 'anchor'
    };
    console.log('navigationExtras', navigationExtras);
    this.router.navigate(['/pages/dashboard/my-reviews/write-reviews'], navigationExtras);
  }

  selectedChanged(event): void {
    this.completedReview = event === 1 ? true : false;
  }

  protected onError(errorMessage: string): void {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
