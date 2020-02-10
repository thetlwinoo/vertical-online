import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account, IOrders } from '@eps/models';
import { SelectItem } from 'primeng/api';
import { CreditCardService } from '@eps/services';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() orders: IOrders;
  @Output() chargeCard = new EventEmitter();

  types: SelectItem[];
  paymentForm: FormGroup;
  selectedType: string;

  constructor() { }

  ngOnInit() {
    this.types = [
      { label: 'Paypal', value: 'PayPal', icon: 'assets/icons/paypal.png', disabled: true },
      { label: 'Visa', value: 'Visa', icon: 'assets/icons/visa.png', disabled: true },
      { label: 'MasterCard', value: 'MasterCard', icon: 'assets/icons/master.png', disabled: true }
    ];

    this.paymentForm = new FormGroup({
      'cardNumber': new FormControl(null, Validators.required),
      'nameOnCard': new FormControl(null, Validators.required),
      'cardExpiry': new FormControl(null, Validators.required),
      'cardCVV': new FormControl(null, Validators.required),
    });
  }

  onSubmit(event) {
    const cardExpiryMonth = this.paymentForm.value.cardExpiry.split("/")[0];
    const cardExpiryYear = this.paymentForm.value.cardExpiry.split("/")[1];
    const cardNumber = this.paymentForm.value.cardNumber.replace(/\D/g, '');

    const postData: any = {
      cardNumber: cardNumber,
      nameOnCard: this.paymentForm.value.nameOnCard,
      cardExpiryMonth: cardExpiryMonth,
      cardExpiryYear: cardExpiryYear,
      cardCVV: this.paymentForm.value.cardCVV,
      totalDue: this.orders.totalDue,
      orderId: this.orders.id
    };
    // console.log('submit', postData);
    this.chargeCard.emit(postData);
  }
}
