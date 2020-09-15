import { Component, OnInit, OnDestroy } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SERVER_API_URL } from '@vertical/constants';
import { Observable, Subject } from 'rxjs';
import { ProductHomeActions } from 'app/ngrx/products/actions';
import { Store, select } from '@ngrx/store';
import * as fromProducts from 'app/ngrx/products/reducers';
import { takeUntil } from 'rxjs/operators';
import { rootAnimations } from '@vertical/animations';

@Component({
  selector: 'app-official-stores',
  templateUrl: './official-stores.component.html',
  styleUrls: ['./official-stores.component.scss'],
  animations: rootAnimations,
})
export class OfficialStoresComponent implements OnInit, OnDestroy {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  bundles$: Observable<any[]>;
  productHome$: Observable<any>;
  productHome: any;
  error$: Observable<string>;

  selectedItem: any;

  tabs = [1, 2, 3];
  array = [1, 2, 3, 4];

  carousel: any;

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
        items: 3,
      },
      576: {
        items: 4,
      },
      768: {
        items: 5,
      },
      992: {
        items: 9,
      },
    },
  };

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromProducts.State>) {
    this.carousel = banner2;
    this.bundles$ = store.pipe(select(fromProducts.getJustForYouCateogries));
    this.productHome$ = store.pipe(select(fromProducts.getProductHome));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromProducts.getProductHomeError));

    this.bundles$.subscribe(item => console.log(item));
  }

  ngOnInit(): void {
    this.store.dispatch(ProductHomeActions.fetchProductsHome());

    this.productHome$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.productHome = payload;
      console.log('payload', payload);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
