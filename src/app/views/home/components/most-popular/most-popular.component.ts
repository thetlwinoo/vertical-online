import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Products, IProducts } from '@vertical/models';
import { deal } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class MostPopularComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  carousel: any;
  ghosts = [];
  title = 'popular products';

  constructor() {
    this.carousel = deal;
    this.ghosts = new Array(10);
  }
}
