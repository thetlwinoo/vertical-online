import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'cash-back-card',
  templateUrl: './cash-back-card.component.html',
  styleUrls: ['./cash-back-card.component.scss'],
})
export class CashBackCardComponent implements OnInit {
  @Input() cashback: any;

  percentage = 20;
  minSpend = 5000;
  couponCode = 'APP123';
  today = moment().startOf('day');

  constructor() {}

  ngOnInit(): void {}

  getDate(days: number): any {
    return moment(this.today)
      .add(days, 'days')
      .format('YYYY-MM-DD');
  }
}
