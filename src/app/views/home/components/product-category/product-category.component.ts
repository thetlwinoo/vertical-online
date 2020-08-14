import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { category } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';
import { IProductCategory } from '@vertical/models';
import { SERVER_API_URL } from '@vertical/constants';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class ProductCategoryComponent implements OnInit {
  @Input() bundles: IProductCategory[];

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  carousel: any;
  title = 'just for you';

  constructor() {
    this.carousel = category;
  }

  ngOnInit(): void {}
}
