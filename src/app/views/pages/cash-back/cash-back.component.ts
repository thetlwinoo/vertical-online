import { Component, OnInit, OnDestroy } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromProducts from 'app/ngrx/products/reducers';
import { SERVER_API_URL } from '@vertical/constants';
import { takeUntil } from 'rxjs/operators';
import { ProductHomeActions } from 'app/ngrx/products/actions';

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
  productHome$: Observable<any>;
  productHome: any;
  error$: Observable<string>;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromProducts.State>) {
    this.carousel = banner2;
    this.bundles$ = store.pipe(select(fromProducts.getJustForYouCateogries));
    this.productHome$ = store.pipe(select(fromProducts.getProductHome));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromProducts.getProductHomeError));
  }

  ngOnInit(): void {
    this.store.dispatch(ProductHomeActions.fetchProductsHome());

    this.productHome$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.productHome = payload;
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
