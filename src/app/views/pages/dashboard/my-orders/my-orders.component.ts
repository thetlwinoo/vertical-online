import { Component, OnInit } from '@angular/core';
import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import * as OrderActions from "app/ngrx/order/order.actions";
import { Observable } from "rxjs";
import { HttpError } from "app/ngrx/app.reducers";
import { Orders } from 'app/core/e-commerce/_models';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  navOrders: any[];
  activeNav: string;
  orderState: Observable<{ allOrders: Orders[], errors: HttpError[], loading: boolean }>;
  rowGroupMetadata: any;
  cols: any[];
  sortOptions: SelectItem[];
  sortKey: string;
  sortOrder: number;
  sortField: string;

  constructor(
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit() {
    this.navOrders = [
      {
        label: 'All'
      },
      {
        label: 'To Pay'
      },
      {
        label: 'To Ship'
      },
      {
        label: 'To Reveive'
      },
      {
        label: 'Cancelled'
      }
    ];
    this.activeNav = this.navOrders[0];

    this.store.dispatch(new OrderActions.FetchOrder);
    this.orderState = this.store.select('order');

    this.orderState.subscribe(orders => {
      let allOrders = orders.allOrders;

      if (orders) {
        this.rowGroupMetadata = {};
        for (let i = 0; i < allOrders.length; i++) {
          let rowData = allOrders[i];
          let id = rowData.id;
          if (i == 0) {
            this.rowGroupMetadata[id] = { index: 0, size: 1 };
          }
          else {
            let previousRowData = allOrders[i - 1];
            let previousRowGroup = previousRowData.id;
            if (id === previousRowGroup)
              this.rowGroupMetadata[id].size++;
            else
              this.rowGroupMetadata[id] = { index: i, size: 1 };
          }
        }
      }
    });

    this.cols = [
      { field: 'orderNumber', header: 'Order Number', filterMatchMode: 'contains' }
    ];
  }

  onChangeNav(event) {
    this.activeNav = event;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    console.log(this.sortField, this.sortOrder);
  }
}
