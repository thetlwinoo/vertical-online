import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Products, IProducts } from '@eps/models';
import { deal } from '@eps/config/owl-carousel';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'popular-products',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class MostPopularComponent {
  @Input() data: IProducts[];
  @Input() loading;
  // @Input() error;
  carousel: any;
  ghosts = [];
  title = 'popular products';

  constructor() {
    this.carousel = deal;
    this.ghosts = new Array(10);
  }
}
