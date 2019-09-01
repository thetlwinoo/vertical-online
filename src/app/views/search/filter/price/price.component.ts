import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import 'rxjs/add/observable/interval';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'price-filter',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() rangePrice: any;
  @Output() selectedPrices = new EventEmitter();

  expand: boolean;
  
  constructor() {
    this.expand = true;
  }

  ngOnInit() { }

  priceChanged(event: any) {
    this.selectedPrices.emit(event.values);
  }

}
