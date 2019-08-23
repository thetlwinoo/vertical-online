import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  @Input() address;

  constructor() { }

  ngOnInit() {
  }

}
