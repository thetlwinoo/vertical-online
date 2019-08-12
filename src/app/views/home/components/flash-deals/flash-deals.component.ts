import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { deal } from '@root/config/owl-carousel';
import { ProductsService } from '@root/services';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { IProducts } from '@root/models';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'flash-deals',
  templateUrl: './flash-deals.component.html',
  styleUrls: ['./flash-deals.component.scss'],
  animations: rootAnimations
})
export class FlashDealsComponent implements OnInit, OnDestroy {
  @Input('eventDate') eventDate;
  carousel: any;
  countdown: any;
  products: IProducts[];

  private _unsubscribeAll: Subject<any>;
  private subscriptions: Subscription[] = [];

  constructor(
    private productsService: ProductsService
  ) {
    this.countdown = {
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    };
    this.carousel = deal;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    const currDate = moment();
    const eventDate = moment(this.eventDate);

    let diff = eventDate.diff(currDate, 'seconds');

    const countDown = interval(1000)
      .pipe(
        map(value => {
          return diff = diff - 1;
        }),
        map(value => {
          const timeLeft = moment.duration(value, 'seconds');

          return {
            days: timeLeft.asDays().toFixed(0),
            hours: timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
          };
        })
      );

    // Subscribe to the countdown interval
    countDown
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.countdown = value;
      });

    this.getFlashDeals();
  }

  getFlashDeals() {
    const searchSubscription = this.productsService.getNewlyAdded()
      .pipe(
        filter((res: HttpResponse<IProducts[]>) => res.ok),
        map((res: HttpResponse<IProducts[]>) => res.body)
      )
      .subscribe(
        (data: any) => {
          console.log(data)
          this.products = data;
        }
      );
    this.subscriptions.push(searchSubscription);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }

}
