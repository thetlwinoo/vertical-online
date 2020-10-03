import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { SERVER_API_URL } from '@vertical/constants';

@Component({
  selector: 'sub-banner',
  templateUrl: './sub-banner.component.html',
  styleUrls: ['./sub-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubBannerComponent implements OnInit, OnChanges {
  @Input() contents;
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  slides: any;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.contents) {
      this.slides = this.contents.find(x => x.webImageTypeHandle === 'sub-banner-wide');
    }
  }
}
