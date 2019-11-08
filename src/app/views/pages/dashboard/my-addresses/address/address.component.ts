import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '@epm/models';

@Component({
  selector: 'dashboard-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() addresses;
  @Input() account: Account;
  @Input() contact;
  @Output() editAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output() setDefault: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  get acountName() {
    return (this.account.firstName == this.account.lastName) ? this.account.firstName : this.account.firstName + ' ' + this.account.lastName;
  }
}
