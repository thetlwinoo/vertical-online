import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'price-filter',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {

  @Input() price;
  @Input() rangePrice;
  @Output() priceFilters = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  priceChanged(event: any) {
    this.priceFilters.emit(event.values);
  }

}
