import { Moment } from 'moment';

export interface IPaymentMethods {
  id?: number;
  name?: string;
  code?: string;
  disabled?: boolean;
  sortOrder?: number;
  iconFont?: string;
  iconPhoto?: string;
  validFrom?: Moment;
  validTo?: Moment;
}

export class PaymentMethods implements IPaymentMethods {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public disabled?: boolean,
    public sortOrder?: number,
    public iconFont?: string,
    public iconPhoto?: string,
    public validFrom?: Moment,
    public validTo?: Moment
  ) {
    this.disabled = this.disabled || false;
  }
}
