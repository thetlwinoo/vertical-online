import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProducts } from '@eps/models';
import { deal } from '@eps/config/owl-carousel';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss'],
  animations: rootAnimations,
})
export class RelatedProductComponent {
  // @Input() product: IProducts;
  @Input() relatedProducts: IProducts[];
  @Input() loading: boolean;
  @Input() error;

  carousel: any = deal;
  ghosts = [];

  constructor() {
    this.ghosts = new Array(10);
  }
}
