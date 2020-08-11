import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sub-banner',
  templateUrl: './sub-banner.component.html',
  styleUrls: ['./sub-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubBannerComponent implements OnInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  constructor() {}

  ngOnInit() {}
}
