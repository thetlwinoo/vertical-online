import { Component, OnInit, ViewEncapsulation, Input, OnChanges, OnDestroy } from '@angular/core';
import { rootAnimations } from '@vertical/animations';
import { SERVER_API_URL } from '@vertical/constants';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subject } from 'rxjs';

@Component({
  selector: 'category-mobile',
  templateUrl: './category-mobile.component.html',
  styleUrls: ['./category-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class CategoryMobileComponent implements OnInit, OnDestroy {
  @Input() categories;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  selectedItem: any;

  options: OwlOptions = {
    loop: true,
    nav: false,
    lazyLoad: true,
    autoplay: false,
    dots: false,
    autoplayTimeout: 5000,
    items: 8,
    responsive: {
      0: {
        items: 3,
      },
      576: {
        items: 4,
      },
      768: {
        items: 5,
      },
      992: {
        items: 8,
      },
    },
  };

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
