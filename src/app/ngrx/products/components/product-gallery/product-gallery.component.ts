import { Component, OnInit, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { IPhotos } from '@vertical/models';
import { ActivatedRoute } from '@angular/router';
import { SERVER_API_URL } from '@vertical/constants';
import { rootAnimations } from '@vertical/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class ProductGalleryComponent implements OnInit, OnChanges {
  @Input() stockItem: any;

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  images: any[] = [];
  selectedPhoto: IPhotos;

  options: OwlOptions = {
    loop: true,
    nav: false,
    lazyLoad: true,
    autoplay: false,
    dots: false,
    autoplayTimeout: 5000,
    items: 5,
    // responsive: {
    //   0: {
    //     items: 4,
    //   },
    //   576: {
    //     items: 5,
    //   },
    //   768: {
    //     items: 5,
    //   },
    //   992: {
    //     items: 5,
    //   },
    // },
  };

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.selectedPhoto = this.stockItem.photoList[0];
  }
}
