import { Component, OnInit, OnDestroy } from '@angular/core';
import { rootAnimations } from '@vertical/animations';
import { SERVER_API_URL } from '@vertical/constants';
import { Subject, Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { banner2 } from '@vertical/config/owl-carousel';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { FlashDealCollectionPageActions } from 'app/ngrx/web-sitemap/actions';

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

  flashDealCollectionPage$: Observable<any>;
  flashDealCollectionPage: any;
  slides: any;
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

  constructor(private store: Store<fromWebSitemap.State>) {
    this.carousel = banner2;
    this.selectedType = this.dealTypes[0];

    this.flashDealCollectionPage$ = store.pipe(select(fromWebSitemap.getFlashDealCollectionPage));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getFlashDealCollectionPageError));
  }

  ngOnInit(): void {
    this.store.dispatch(FlashDealCollectionPageActions.fetchFlashDealCollectionPage());

    this.flashDealCollectionPage$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.flashDealCollectionPage = payload;

      if (payload && payload.contents) {
        this.slides = payload.contents.find(x => x.webImageTypeHandle === 'main-banner-full-wide');
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
