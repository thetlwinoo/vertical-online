/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { IOrders } from '@eps/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare let stripe: any;
declare let elements: any;

@Component({
  selector: 'credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() orders: IOrders;
  @Output() chargeCard = new EventEmitter();

  paymentForm: FormGroup;

  extraData = {
    name: null,
    address_city: null,
    address_line1: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
  };

  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      cardNumber1: new FormControl(null, Validators.required),
      cardNumber2: new FormControl(null, Validators.required),
      cardNumber3: new FormControl(null, Validators.required),
      cardNumber4: new FormControl(null, Validators.required),
      nameOnCard: new FormControl(null, Validators.required),
      cardExpiryMonth: new FormControl(null, Validators.required),
      cardExpiryYear: new FormControl(null, Validators.required),
      cardCVV: new FormControl(null, Validators.required),
    });
  }

  onSubmit(event): void {
    const cardNumber =
      this.paymentForm.value.cardNumber1.replace(/\D/g, '') +
      this.paymentForm.value.cardNumber2.replace(/\D/g, '') +
      this.paymentForm.value.cardNumber3.replace(/\D/g, '') +
      this.paymentForm.value.cardNumber4.replace(/\D/g, '');

    const postData: any = {
      cardNumber,
      nameOnCard: this.paymentForm.value.nameOnCard,
      cardExpiryMonth: this.paymentForm.value.cardExpiryMonth,
      cardExpiryYear: this.paymentForm.value.cardExpiryYear,
      cardCVV: this.paymentForm.value.cardCVV,
      totalDue: this.orders.totalDue,
      orderId: this.orders.id,
    };
    this.chargeCard.emit(postData);
  }

  ngOnDestroy(): void {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  ngAfterViewInit(): void {
    this.initiateCardElement();
  }

  initiateCardElement(): void {
    const cardStyle = {
      base: {
        // color: '#32325d',
        // fontFamily: 'Muli, Helvetica Neue, Arial, sans-serif',
        // fontSmoothing: 'antialiased',
        // fontSize: '16px',
        '::placeholder': {
          color: '#00000065',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { hidePostalCode: true, style: cardStyle });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }): void {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async createStripeToken() {
    this.extraData = {
      name: this.paymentForm.value.nameOnCard,
      address_city: 'Singapore',
      address_line1: 'Blk 155, Hougang Street 11',
      address_line2: '#11-174',
      address_state: 'Serangoon',
      address_zip: '530155',
    };

    const { token, error } = await stripe.createToken(this.card, this.extraData);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
  }

  onSuccess(token): void {
    console.log(token);
    this.chargeCard.emit(token);
  }

  onError(error): void {
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
