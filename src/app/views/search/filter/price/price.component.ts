import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'price-filter',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() rangePrice: any;
  @Output() selectedPrices = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  priceChanged(event: any) {
    this.selectedPrices.emit(event.values);
  }

}
