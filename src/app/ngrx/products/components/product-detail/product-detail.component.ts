import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProducts } from '@root/models';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: IProducts;
  @Input() inCompare: boolean;
  @Input() inWishlist: boolean;
  @Output() addToCompare = new EventEmitter<IProducts>();
  @Output() removeFromCompare = new EventEmitter<IProducts>();
  @Output() addToWishlist = new EventEmitter<IProducts>();
  @Output() removeFromWishlist = new EventEmitter<IProducts>();

  constructor() { }

  ngOnInit() {

  }

  toggleCompare(event, inCompare) {
    if (inCompare) {
      this.removeFromCompare.emit(event);
    } else {
      this.addToCompare.emit(event);
    }
  }

  toggleWishlist(event, inWishlist) {
    if (inWishlist) {
      this.removeFromWishlist.emit(event);
    } else {
      this.addToWishlist.emit(event);
    }
  }
}
