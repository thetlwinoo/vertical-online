import { Component, OnInit, OnDestroy } from '@angular/core';
import { rootAnimations } from '@vertical/animations';
import { SERVER_API_URL } from '@vertical/constants';
import { Subject, Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { banner2 } from '@vertical/config/owl-carousel';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as fromProducts from 'app/ngrx/products/reducers';
import { ProductHomeActions } from 'app/ngrx/products/actions';

@Component({
  selector: 'app-flash-deal-collection',
  templateUrl: './flash-deal-collection.component.html',
  styleUrls: ['./flash-deal-collection.component.scss'],
  animations: rootAnimations,
})
export class FlashDealCollectionComponent implements OnInit, OnDestroy {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  carousel: any;
  selectedType: any;

  productHome$: Observable<any>;
  productHome: any;
  error$: Observable<string>;

  options: OwlOptions = {
    loop: true,
    nav: false,
    lazyLoad: true,
    autoplay: false,
    dots: false,
    autoplayTimeout: 5000,
    items: 9,
    responsive: {
      0: {
        items: 4,
      },
      576: {
        items: 5,
      },
      768: {
        items: 5,
      },
      992: {
        items: 9,
      },
    },
  };

  dealTypes: any[] = [
    {
      id: 1,
      title: 'Ongoing',
    },
    {
      id: 2,
      title: 'Upcoming',
    },
  ];

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromProducts.State>) {
    this.carousel = banner2;
    this.selectedType = this.dealTypes[0];

    this.productHome$ = store.pipe(select(fromProducts.getProductHome));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromProducts.getProductHomeError));
  }

  ngOnInit(): void {
    this.store.dispatch(ProductHomeActions.fetchProductsHome());

    this.productHome$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.productHome = payload;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
