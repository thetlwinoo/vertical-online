import { Component, OnInit, Input } from '@angular/core';
import { category } from '@root/config/owl-carousel';
import { rootAnimations } from '@root/animations';
import { IProductCategory } from '@root/models';

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
