import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT } from '@vertical/constants';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss'],
})
export class VoucherCardComponent implements OnInit {
  percentage = 40;
  minSpend = 5000;
  today = moment().startOf('day');

  constructor() {}

  ngOnInit(): void {}

  getDate(days: number): any {
    return moment(this.today)
      .add(days, 'days')
      .format('YYYY-MM-DD');
  }
}
