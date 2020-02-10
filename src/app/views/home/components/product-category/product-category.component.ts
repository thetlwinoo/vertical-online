import { Component, OnInit, Input } from '@angular/core';
import { category } from '@eps/config/owl-carousel';
import { rootAnimations } from '@eps/animations';
import { IProductCategory } from '@eps/models';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  animations: rootAnimations
})
export class ProductCategoryComponent implements OnInit {
  @Input() data: IProductCategory[];
  carousel: any;

  constructor() {
    this.carousel = category;
  }

  ngOnInit() { }
}
