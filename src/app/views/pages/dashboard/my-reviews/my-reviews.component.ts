import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationExtras, ActivatedRoute, ParamMap } from '@angular/router';
import { IProducts, IOrders } from '@eps/models';
import { ReviewsService, OrderService, OrderLinesService } from '@eps/services';
import { AccountService } from '@eps/core';
import { SERVER_API_URL, ITEMS_PER_PAGE } from '@eps/constants';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
// import * as _ from 'lodash';
import { select, Store } from '@ngrx/store';
import { OrderActions } from 'app/ngrx/checkout/actions';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import _ from 'lodash';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss'],
})
export class MyReviewsComponent implements OnInit, OnDestroy {
  orders$: Observable<IOrders[]>;
  orderLoading$: Observable<boolean>;
  orders: IOrders[];
  totalItems$: Observable<number>;

  currentAccount: any;
  eventSubscriber: Subscription;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  filter: any = { completedReview: false };

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
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private i18n: NzI18nService
  ) {
    this.i18n.setLocale(en_US);

    this.orders$ = store.pipe(select(fromCheckout.getReviewOrderFetched));
    this.totalItems$ = store.pipe(select(fromCheckout.getTotalReviewOrderFetched));
    this.orderLoading$ = store.pipe(select(fromCheckout.getOrderLoading));
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    const paging = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    const query = _.assign(paging, this.filter);

    this.store.dispatch(OrderActions.fetchCustomerOrdersReviews({ query }));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;

      this.loadPage();
    });

    // this.handleBackNavigation();

    this.accountService
      .identity()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(account => {
        if (account) {
          this.currentAccount = account;
        }
      });
  }

  handleBackNavigation(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const prevPage = params.get('page');
      const prevSort = params.get('sort');
      const prevSortSplit = prevSort?.split(',');
      if (prevSortSplit) {
        this.predicate = prevSortSplit[0];
        this.ascending = prevSortSplit[1] === 'asc';
      }
      if (prevPage && +prevPage !== this.page) {
        this.loadPage(+prevPage);
      } else {
        this.loadPage(this.page);
      }
    });
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;

    this.itemsPerPage = pageSize;
    this.page = pageIndex;
    this.loadPage(this.page);
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

  onClickReview(orderId: number): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { orderId },
      // fragment: 'anchor'
    };
    this.router.navigate(['/pages/dashboard/my-reviews/write-reviews'], navigationExtras);
  }

  selectedChanged(event): void {
    const completed = event === 1 ? true : false;

    this.filter = {
      completedReview: completed,
    };

    this.loadPage(1);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected onError(errorMessage: string): void {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
