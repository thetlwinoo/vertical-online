import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {
  @Input() noOfAddress;
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
