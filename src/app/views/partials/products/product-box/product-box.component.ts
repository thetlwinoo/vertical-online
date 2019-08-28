import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnDestroy {
  @Input() product;
  @Input() mode;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
