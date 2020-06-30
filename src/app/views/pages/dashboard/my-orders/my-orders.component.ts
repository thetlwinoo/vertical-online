import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IOrders } from '@eps/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { OrderActions, OrderLineActions } from 'app/ngrx/checkout/actions';
import { Router } from '@angular/router';
import { SERVER_API_URL } from '@eps/constants';
import * as moment from 'moment';
import { LONG_DATE_TIME_FORMAT, LONG_DATE_FORMAT } from '@eps/constants/input.constants';
import { Moment } from 'moment';

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
  rowGroupMetadata: any;
  cols: any[];
  sortKey: string;
  sortOrder: number;
  sortField: string;
  expandSet = new Set<number>();
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor(private store: Store<fromCheckout.State>, private router: Router) {
    this.orders$ = store.pipe(select(fromCheckout.getOrderFetched));
    this.ordersLoading$ = store.pipe(select(fromCheckout.getOrderLoading));
  }

  ngOnInit(): void {
    this.navOrders = [
      {
        label: 'All',
      },
      {
        label: 'To Pay',
      },
      {
        label: 'To Ship',
      },
      {
        label: 'To Receive',
      },
      {
        label: 'Cancelled',
      },
    ];
    this.activeNav = this.navOrders[0];

    this.store.dispatch(OrderActions.fetchOrder({ query: null }));

    this.cols = [{ field: 'orderNumber', header: 'Order Number', filterMatchMode: 'contains' }];
  }

  // onExpandChange(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.store.dispatch(OrderLineActions.fetchOrderLines({ orderId: id }));
  //     this.expandSet.clear();
  //     this.expandSet.add(id);
  //   } else {
  //     this.expandSet.delete(id);
  //   }
  // }

  onChangeNav(event): void {
    this.activeNav = event;
  }

  onSortChange(event): void {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getDate(date: string): string {
    const converted = moment(date).format(LONG_DATE_FORMAT);
    return converted;
  }

  getDateTime(date: Moment): string {
    const converted = date.format(LONG_DATE_TIME_FORMAT);
    return converted;
  }
}
