import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '@eps/models';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'dashboard-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() addresses;
  @Input() account: Account;
  @Input() contact;
  @Output() editAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output() setDefault: EventEmitter<any> = new EventEmitter<any>();

  constructor(private nzMessageService: NzMessageService) {}

  ngOnInit(): void {}

  get acountName(): string {
    return this.account.firstName === this.account.lastName ? this.account.firstName : this.account.firstName + ' ' + this.account.lastName;
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(address): void {
    this.deleteAddress.emit(address);
  }
}
