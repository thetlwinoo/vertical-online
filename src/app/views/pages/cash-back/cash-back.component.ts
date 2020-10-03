import { Component, OnInit, OnDestroy } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { SERVER_API_URL } from '@vertical/constants';
import { takeUntil } from 'rxjs/operators';
import { CashBackPageActions } from 'app/ngrx/web-sitemap/actions';

@Component({
  selector: 'app-cash-back',
  templateUrl: './cash-back.component.html',
  styleUrls: ['./cash-back.component.scss'],
  animations: rootAnimations,
})
export class CashBackComponent implements OnInit, OnDestroy {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  carousel: any;
  vouchers = [];
  bundles$: Observable<any[]>;
  cashBack$: Observable<any>;
  cashBack: any;
  slides: any;
  error$: Observable<string>;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromWebSitemap.State>) {
    this.carousel = banner2;
    this.bundles$ = store.pipe(select(fromWebSitemap.getCashBackCateogries));
    this.cashBack$ = store.pipe(select(fromWebSitemap.getCashBackPage));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getCashBackPageError));
  }

  ngOnInit(): void {
    this.store.dispatch(CashBackPageActions.fetchCashBackPage());

    this.cashBack$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.cashBack = payload;

      if (payload && payload.contents) {
        this.slides = payload.contents.find(x => x.webImageTypeHandle === 'main-banner-full-wide');
      }
    });

    for (let i = 0; i < 4; i++) {
      this.vouchers.push(i);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
