import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-payment-options',
  templateUrl: './my-payment-options.component.html',
  styleUrls: ['./my-payment-options.component.scss'],
})
export class MyPaymentOptionsComponent implements OnInit {
  listOfData = [
    {
      key: '1',
      cardNumber: '421808******8220',
      expiryDate: 'Expires 01/21',
    },
  ];

  listOfOthers = [
    {
      key: '1',
      account: 'th****@yahoo.com',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
