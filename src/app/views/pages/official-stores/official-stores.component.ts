import { Component, OnInit, OnDestroy } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SERVER_API_URL } from '@vertical/constants';
import { Observable, Subject } from 'rxjs';
import { OfficialStoresPageActions } from 'app/ngrx/web-sitemap/actions';
import { Store, select } from '@ngrx/store';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
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
  officialStoresPage$: Observable<any>;
  officialStoresPage: any;
  error$: Observable<string>;

  selectedItem: any;

  tabs = [1, 2, 3];
  array = [1, 2, 3, 4];
  slides: any;
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

  constructor(private store: Store<fromWebSitemap.State>) {
    this.carousel = banner2;
    this.bundles$ = store.pipe(select(fromWebSitemap.getOfficialStoresCateogries));
    this.officialStoresPage$ = store.pipe(select(fromWebSitemap.getOfficialStoresPage));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getOfficialStoresPageError));

    this.bundles$.subscribe(item => console.log(item));
  }

  ngOnInit(): void {
    this.store.dispatch(OfficialStoresPageActions.fetchOfficialStoresPage());

    this.officialStoresPage$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.officialStoresPage = payload;

      if (payload && payload.contents) {
        this.slides = payload.contents.find(x => x.webImageTypeHandle === 'main-banner-full-wide');
      }

      console.log('payload', payload);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
