import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { banner2 } from '@eps/config/owl-carousel';

@Component({
  selector: 'slider-banner',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['./slider-banner.component.scss'],
})
export class SliderBannerComponent implements OnInit {
  @Input() categories;
  @Input() loading;

  carousel: any;
  currentMenuIndex: any;

  features = [
    {
      label: 'Grocery Mart',
      icon: 'grocery_mart.svg',
    },
    {
      label: 'Flash Deal',
      icon: 'flash_deal.svg',
    },
    {
      label: 'Cashback',
      icon: 'cash_back.svg',
    },
    {
      label: 'Collect Voucher',
      icon: 'collect_voucher.svg',
    },
    {
      label: 'Official Stores',
      icon: 'online_store.svg',
    },
    {
      label: 'Brand Collection',
      icon: 'brand_collection.svg',
    },
    {
      label: 'Made In Myanmar',
      icon: 'made_in_myanmar.svg',
    },
    {
      label: 'Free Shipping',
      icon: 'free_shipping.svg',
    },
  ];
  constructor() {
    this.carousel = banner2;
  }

  ngOnInit(): void {}

  change(value: boolean): void {
    console.log(value);
  }
}
