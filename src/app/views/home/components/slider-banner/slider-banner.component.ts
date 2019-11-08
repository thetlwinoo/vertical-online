import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { banner2 } from '@epm/config/owl-carousel';

@Component({
  selector: 'slider-banner',
  templateUrl: './slider-banner.component.html',
  styleUrls: ['./slider-banner.component.scss']
})
export class SliderBannerComponent implements OnInit {
  carousel: any;
  categories = [
    {
      "label": "Sales",
      "icon": "bc1.png"
    },
    {
      "label": "Brand Collection",
      "icon": "bc2.png"
    },
    {
      "label": "BieeRoot Special",
      "icon": "bc3.png"
    },
    {
      "label": "Seller Vouchers",
      "icon": "bc4.png"
    },
    {
      "label": "Discount Coupons",
      "icon": "bc5.png"
    },
    {
      "label": "Coin Rewards",
      "icon": "bc6.jpg"
    },
    {
      "label": "Gold Seller",
      "icon": "bc7.png"
    },
    {
      "label": "Express Shop",
      "icon": "bc8.png"
    }
  ];
  constructor() {
    this.carousel = banner2;
  }

  ngOnInit() {
  }

}
