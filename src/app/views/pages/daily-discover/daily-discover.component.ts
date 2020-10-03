import { Component, OnInit, OnDestroy } from '@angular/core';
import { rootAnimations } from '@vertical/animations';
import { SERVER_API_URL } from '@vertical/constants';
import { Subject, Observable } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { banner2 } from '@vertical/config/owl-carousel';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { HomePageActions } from 'app/ngrx/web-sitemap/actions';

@Component({
  selector: 'app-daily-discover',
  templateUrl: './daily-discover.component.html',
  styleUrls: ['./daily-discover.component.scss'],
  animations: rootAnimations,
})
export class DailyDiscoverComponent implements OnInit, OnDestroy {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  carousel: any;
  selectedType: any;

  homePage$: Observable<any>;
  homePage: any;
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
      title: 'Daily Discover',
    },
  ];

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromWebSitemap.State>) {
    this.carousel = banner2;
    this.selectedType = this.dealTypes[0];

    this.homePage$ = store.pipe(select(fromWebSitemap.getHomePage));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getHomePageError));
  }

  ngOnInit(): void {
    this.store.dispatch(HomePageActions.fetchHomePage());

    this.homePage$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.homePage = payload;

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
