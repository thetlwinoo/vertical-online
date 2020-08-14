import { Component, OnInit, OnDestroy } from '@angular/core';
import { IOrders, IPeople, ICustomers } from '@vertical/models';
import { ActivatedRoute } from '@angular/router';
import { SERVER_API_URL } from '@vertical/constants';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'success-form',
  templateUrl: './success-form.component.html',
  styleUrls: ['./success-form.component.scss'],
})
export class SuccessFormComponent implements OnInit, OnDestroy {
  orders: IOrders;
  activeIds: any[] = [];
  people$: Observable<IPeople>;
  people: IPeople;
  // customer$: Observable<ICustomers>;

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  private unsubscribe$: Subject<any> = new Subject();

  constructor(protected activatedRoute: ActivatedRoute, private authStore: Store<fromAuth.State>) {
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
    // this.customer$ = authStore.pipe(select(fromAuth.getCustomerFetched));

    this.activatedRoute.data.pipe(takeUntil(this.unsubscribe$)).subscribe(({ orders }) => {
      this.orders = orders;
    });
  }

  ngOnInit(): void {}

  getEstimateDate(date: Moment, days: number): string {
    return moment(date)
      .add(days, 'days')
      .format('DD MMM');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
