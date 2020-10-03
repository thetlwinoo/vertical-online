import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT, SERVER_API_URL } from '@vertical/constants';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss'],
})
export class VoucherCardComponent implements OnInit {
  @Input() voucher;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor() {}

  ngOnInit(): void {}
}
