import { Component, OnInit, OnDestroy } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { SERVER_API_URL } from '@vertical/constants';
import { takeUntil } from 'rxjs/operators';
import { CollectVoucherPageActions } from 'app/ngrx/web-sitemap/actions';

@Component({
  selector: 'app-collect-voucher',
  templateUrl: './collect-voucher.component.html',
  styleUrls: ['./collect-voucher.component.scss'],
  animations: rootAnimations,
})
export class CollectVoucherComponent implements OnInit, OnDestroy {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  carousel: any;
  vouchers = [];
  bundles$: Observable<any[]>;
  collectVoucherPage$: Observable<any>;
  collectVoucherPage: any;
  slides: any;
  error$: Observable<string>;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromWebSitemap.State>) {
    this.carousel = banner2;
    this.bundles$ = store.pipe(select(fromWebSitemap.getCollectVoucherCateogries));
    this.collectVoucherPage$ = store.pipe(select(fromWebSitemap.getCollectVoucherPage));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getCollectVoucherPageError));
  }

  ngOnInit(): void {
    this.store.dispatch(CollectVoucherPageActions.fetchCollectVoucherPage());

    this.collectVoucherPage$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.collectVoucherPage = payload;
      console.log('collect', payload);

      if (payload && payload.contents) {
        this.slides = payload.contents.find(x => x.webImageTypeHandle === 'main-banner-full-wide');
      }
    });

    for (let i = 0; i < 20; i++) {
      this.vouchers.push(i);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
