import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IOrders } from '@eps/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { OrderActions, OrderLineActions } from 'app/ngrx/checkout/actions';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SERVER_API_URL, ITEMS_PER_PAGE } from '@eps/constants';
import * as moment from 'moment';
import { LONG_DATE_TIME_FORMAT, LONG_DATE_FORMAT } from '@eps/constants/input.constants';
import { Moment } from 'moment';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import _ from 'lodash';

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  navOrders: any[];
  activeNav: string;
  orders$: Observable<IOrders[]>;
  ordersLoading$: Observable<boolean>;
  totalItems$: Observable<number>;

  rowGroupMetadata: any;
  cols: any[];
  expandSet = new Set<number>();

  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  filter: any;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor(
    private store: Store<fromCheckout.State>,
    private router: Router,
    protected activatedRoute: ActivatedRoute,
    private i18n: NzI18nService
  ) {
    this.i18n.setLocale(en_US);

    this.orders$ = store.pipe(select(fromCheckout.getOrderFetched));
    this.totalItems$ = store.pipe(select(fromCheckout.getTotalOrders));
    this.ordersLoading$ = store.pipe(select(fromCheckout.getOrderLoading));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.loadPage();
    });

    // this.handleBackNavigation();

    this.navOrders = [
      {
        label: 'All',
        status: null,
      },
      {
        label: 'To Pay',
        status: 'PENDING',
      },
      {
        label: 'To Ship',
        status: 'READY_TO_SHIP',
      },
      {
        label: 'To Receive',
        status: 'SHIPPED',
      },
      {
        label: 'Cancelled',
        status: 'CANCELLED',
      },
    ];
    this.activeNav = this.navOrders[0];

    this.cols = [{ field: 'orderNumber', header: 'Order Number', filterMatchMode: 'contains' }];
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    const paging = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };

    const query = _.assign(paging, this.filter);

    this.store.dispatch(OrderActions.fetchOrder({ query }));
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

  onChangeNav(event): void {
    this.activeNav = event;
  }

  getDate(date: string): string {
    const converted = moment(date).format(LONG_DATE_FORMAT);
    return converted;
  }

  getDateTime(date: Moment): string {
    const converted = date.format(LONG_DATE_TIME_FORMAT);
    return converted;
  }

  selectedIndexChanged(event): void {
    switch (event) {
      case 0:
        this.filter = {};
        break;
      case 1:
        this.filter = { 'paymentStatus.equals': 'PENDING' };
        break;
      case 2:
        this.filter = { 'status.equals': 'READY_TO_SHIP' };
        break;
      case 3:
        this.filter = { 'status.equals': 'SHIPPED' };
        break;
      case 4:
        this.filter = { 'status.equals': 'CANCELLED' };
        break;
    }

    this.loadPage(1);
  }

  cancelOrderLine(id: number): void {
    this.store.dispatch(OrderLineActions.cancelOrderLine({ id }));
  }
}
