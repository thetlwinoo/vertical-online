import { Moment } from 'moment';
import * as moment from 'moment';

export interface IQuestions {
  id?: number;
  customerQuestion?: any;
  customerQuestionOn?: Moment;
  supplierAnswer?: any;
  supplierAnswerOn?: Moment;
  validFrom?: Moment;
  validTo?: Moment;
  supplierName?: string;
  supplierId?: number;
  personFullName?: string;
  personId?: number;
  productName?: string;
  productId?: number;
}

export class Questions implements IQuestions {
  constructor(
    public id?: number,
    public customerQuestion?: any,
    public customerQuestionOn?: Moment,
    public supplierAnswer?: any,
    public supplierAnswerOn?: Moment,
    public validFrom?: Moment,
    public validTo?: Moment,
    public supplierName?: string,
    public supplierId?: number,
    public personFullName?: string,
    public personId?: number,
    public productName?: string,
    public productId?: number
  ) {
    this.validFrom = this.validFrom || moment();
  }
}
