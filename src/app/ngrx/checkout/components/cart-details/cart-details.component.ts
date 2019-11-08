import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IShoppingCarts, AddToCartProps, ReduceFromCartProps } from '@epm/models';

@Component({
  selector: 'cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  @Input() shoppingCart: IShoppingCarts;
  @Input() itemCount: number;
  @Input() totalQuantity: number;
  @Input() cartPrice: number;
  @Output() add = new EventEmitter<AddToCartProps>();
  @Output() remove = new EventEmitter<number>();
  @Output() reduce = new EventEmitter<ReduceFromCartProps>();
  @Output() apply = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onAdd(id, quantity) {
    let props: AddToCartProps = {
      id: id,
      quantity: parseInt(quantity)
    };

    this.add.emit(props);
  }

  onReduce(id, quantity) {
    let props: ReduceFromCartProps = {
      id: id,
      quantity: parseInt(quantity)
    };

    this.reduce.emit(props);
  }
}
