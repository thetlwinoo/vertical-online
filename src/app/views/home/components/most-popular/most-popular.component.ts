import { Component, OnInit, Input } from '@angular/core';
import { Products, IProducts } from '@eps/models';
import { deal } from '@eps/config/owl-carousel';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
  animations: rootAnimations,
})
export class MostPopularComponent{
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  carousel: any;
  ghosts = [];

  constructor(
  ) {
    this.carousel = deal;
    this.ghosts = new Array(10);
  }

}
