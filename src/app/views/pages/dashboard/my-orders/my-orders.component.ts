import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SelectItem } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { IOrders } from '@eps/models';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { OrderActions } from 'app/ngrx/checkout/actions';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  navOrders: any[];
  activeNav: string;
  orders$: Observable<IOrders[]>;
  rowGroupMetadata: any;
  cols: any[];
  sortOptions: SelectItem[];
  sortKey: string;
  sortOrder: number;
  sortField: string;

  constructor(
    private store: Store<fromCheckout.State>,
  ) {
    this.orders$ = store.pipe(select(fromCheckout.getOrderFetched)) as Observable<IOrders[]>;
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

    this.store.dispatch(OrderActions.fetchOrder());

    this.orders$.subscribe(orders => {
      if (orders) {
        this.rowGroupMetadata = {};
        for (let i = 0; i < orders.length; i++) {
          let rowData = orders[i];
          let id = rowData.id;
          if (i == 0) {
            this.rowGroupMetadata[id] = { index: 0, size: 1 };
          }
          else {
            let previousRowData = orders[i - 1];
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
