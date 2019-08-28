import { Component, OnInit, Input } from '@angular/core';
import { Products, IProducts } from '@root/models';
import { deal } from '@root/config/owl-carousel';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
  animations: rootAnimations
})
export class MostPopularComponent{
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  carousel: any;
  constructor(
  ) {
    this.carousel = deal;
  }

}
