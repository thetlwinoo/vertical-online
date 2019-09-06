import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IProducts } from '@root/models';
import { deal } from '@root/config/owl-carousel';
import { rootAnimations } from '@root/animations';

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
