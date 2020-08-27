import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import NgxTwitterTimelineOptions from 'ngx-twitter-timeline/lib/ngx-twitter-timeline-options.interface';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  twitterOptions: NgxTwitterTimelineOptions;
  data: any[] = [
    {
      title: 'gardilo',
      col: '6',
      children: [
        {
          title: 'sell on gardilo',
        },
        {
          title: 'about us',
        },
        {
          title: 'privacy policy',
        },
        {
          title: 'terms & condition',
          url: '/pages/terms-and-conditions',
        },
      ],
    },
    {
      title: 'cutomer services',
      col: '6',
      children: [
        {
          title: 'buy on gardilo',
        },
        {
          title: 'track your order',
        },
        {
          title: 'help center',
        },
        {
          title: 'contact us',
        },
      ],
    },
    {
      title: 'follow us',
      col: '4',
      children: [
        {
          title: 'facebook',
          url: 'https://www.facebook.com/ZeZaWarMyanmar',
          extraLink: true,
        },
        {
          title: 'instagram',
          url: 'https://www.instagram.com/zezawar.myanmar/',
          extraLink: true,
        },
        {
          title: 'twitter',
          url: 'https://twitter.com/zezawar9',
          extraLink: true,
        },
      ],
    },
    {
      title: 'delivery services',
      col: '4',
      children: [
        {
          title: 'global logistics',
        },
        {
          title: 'consult myanmar',
        },
        {
          title: 'pilot delivery',
        },
      ],
    },
    {
      title: 'payment methods',
      col: '4',
      children: [
        {
          title: 'paypal',
        },
        {
          title: 'credit/debit card',
        },
        {
          title: 'bank transfer',
        },
        {
          title: 'casn on delivery',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.twitterOptions = {
      tweetLimit: 1,
      chrome: ['noheader'],
    };
  }
}
