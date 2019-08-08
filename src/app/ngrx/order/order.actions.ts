import { Action } from '@ngrx/store';
import { Orders } from 'app/core/e-commerce/_models';
import { PaymentObject } from "./order.reducer";
import { HttpError } from "../app.reducers";

export const IS_PURCHASE_ACTIVE = 'IS_PURCHASE_ACTIVE';
export const FETCH_ORDER = 'FETCH_ORDER';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const POST_ORDER_FORM = 'POST_ORDER_FORM';
export const POST_PAYMENT = 'POST_PAYMENT';
export const POST_ORDER = 'POST_ORDER';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const EMPTY_ORDER = 'EMPTY_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';


export class IsPurchaseActive implements Action {
  readonly type = IS_PURCHASE_ACTIVE;

  constructor(public payload: boolean) {
  }
}

export class FetchOrder implements Action {
  readonly type = FETCH_ORDER;
}

export class FetchOrderSuccess implements Action {
  readonly type = FETCH_ORDER_SUCCESS;

  constructor(public payload: Orders[]) {
  }
}

export class PostOrder implements Action {
  readonly type = POST_ORDER;

  constructor(public payload: Orders) {
  }
}

export class PostOrderSuccess implements Action {
  readonly type = POST_ORDER_SUCCESS;

  constructor(public payload: Orders) {
  }
}


export class PostPayment implements Action {
  readonly type = POST_PAYMENT;

  constructor(public payload: PaymentObject) {
  }
}

export class EmptyOrder implements Action {
  readonly type = EMPTY_ORDER;
}

export class OrderError implements Action {
  readonly type = ORDER_ERROR;

  constructor(public payload: HttpError) {
  }
}


export type OrderActions =
  IsPurchaseActive
  | FetchOrder
  | FetchOrderSuccess
  | PostOrder
  | PostOrderSuccess
  | PostPayment
  | OrderError
  | EmptyOrder;
