import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { deal } from '@vertical/config/owl-carousel';
import { IProducts } from '@vertical/models';
import { rootAnimations } from '@vertical/animations';

@Component({
  selector: 'flash-deals',
  templateUrl: './flash-deals.component.html',
  styleUrls: ['./flash-deals.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class FlashDealsComponent implements OnInit, OnDestroy {
  @Input('eventDate') eventDate;
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;

  carousel: any;
  countdown: any;
  ghosts = [];
  title = 'Flash Deals';
  private _unsubscribeAll: Subject<any>;

  constructor() {
    this.countdown = {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
    };
    this.carousel = deal;
    this.ghosts = new Array(10);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    const currDate = moment();
    const eventDate = moment(this.eventDate);

    let diff = eventDate.diff(currDate, 'seconds');

    const countDown = interval(1000).pipe(
      map(value => (diff = diff - 1)),
      map(value => {
        const timeLeft = moment.duration(value, 'seconds');

        return {
          days: timeLeft.asDays().toFixed(0),
          hours: timeLeft.hours(),
          minutes: timeLeft.minutes(),
          seconds: timeLeft.seconds(),
        };
      })
    );

    // Subscribe to the countdown interval
    countDown.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      this.countdown = value;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
