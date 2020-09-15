import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';

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
      url: '/pages/categories/26723',
    },
    {
      label: 'Flash Deals',
      icon: 'flash_deal.svg',
      url: '/pages/flash-deal-collection',
    },
    {
      label: 'Cashback',
      icon: 'cash_back.svg',
      url: '/pages/cash-back',
    },
    {
      label: 'Collect Voucher',
      icon: 'collect_voucher.svg',
      url: '/pages/collect-voucher',
    },
    {
      label: 'Official Stores',
      icon: 'online_store.svg',
      url: '/pages/official-stores',
    },
    {
      label: 'Brand Collection',
      icon: 'brand_collection.svg',
      url: '/pages/brand-collection',
    },
    {
      label: 'Made In Myanmar',
      icon: 'made_in_myanmar.svg',
      url: '/pages/made-in-myanmar',
    },
    {
      label: 'Free Shipping',
      icon: 'free_shipping.svg',
      url: '/pages/free-shipping',
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
