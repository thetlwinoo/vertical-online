import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProducts } from '@epm/models';
import { deal } from '@epm/config/owl-carousel';
import { rootAnimations } from '@epm/animations';

@Component({
  selector: 'related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss'],
  animations: rootAnimations
})
export class RelatedProductComponent {
  // @Input() product: IProducts;
  @Input() relatedProducts: IProducts[];

  carousel: any;

  constructor(
  ) {
    this.carousel = deal;
  }
}
