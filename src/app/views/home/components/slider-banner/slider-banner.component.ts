import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { SERVER_API_URL } from '@vertical/constants';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'slider-banner',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['./slider-banner.component.scss'],
})
export class SliderBannerComponent implements OnInit, OnChanges {
  @Input() categories;
  @Input() contents;
  @Input() loading;

  carousel: any;
  currentMenuIndex: any;
  slides: any;

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
      url: '/search',
      queryParams: {
        madeInMyanmar: true,
      },
    },
    {
      label: 'Free Shipping',
      icon: 'free_shipping.svg',
      url: '/search',
      queryParams: {
        freeDelivery: true,
      },
    },
  ];

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor() {
    this.carousel = banner2;
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.contents) {
      this.slides = this.contents.find(x => x.webImageTypeHandle === 'main-banner-wide');
    }
  }

  change(value: boolean): void {
    console.log(value);
  }
}
