import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { cartFeatureKey } from '../../reducers/cart.reducer';
import { IOrders } from '@eps/models';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() shoppingCart;
  @Input() cartPrice;
  @Input() default;
  @Input() addresses;
  @Input() totalQuantity;
  @Output() post = new EventEmitter<IOrders>();
  addNewAddressInd: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onCancel(event) {
    this.addNewAddressInd = false;
  }
}
