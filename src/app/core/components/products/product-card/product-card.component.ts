import { OnInit, Component, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Output() quickview = new EventEmitter<any>();

  title;
  rating: number = 4;
  lowestPrice: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
