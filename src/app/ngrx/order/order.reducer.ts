import * as OrderActions from './order.actions';
import { Discount, ProductDisplay } from "../cart/cart.reducer";
import { HttpError } from "../app.reducers";
import { Orders } from '@root/models';

export interface OrderDetails {
  id: number,
  productDisplay: ProductDisplay, //expects productDisplay convert it from product in the backed
  amount: number
}

export interface Orders {
  id: number,
  orderDiscount: Discount,
  orderDetailsList: OrderDetails[],
  shipName: string,
  shipAddress: string,
  shipAddress2: string,
  city: string,
  state: string,
  zip: string,
  country: string,
  phone: string,
  totalPrice: number,
  totalCargoPrice: number,
  email: string,
  date: string,
  shipped: number,
  cargoFirm: string,
  trackingNumber: string
}

export interface PaymentObject {
  cardNo: string,
  cardExp: { month: string, year: string }
  cardOwner: string,
  cardCCV: string
}

export interface PostOrders {
  billToAddress: number,
  shipToAddress: number,
  orderDate: Date,
  shipDate: Date,
  dueDate: Date
}

export interface BusinessEntityObject {
  shipName: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  // stateProvince: string,
  postalCode: string,
  phone: string,
  email: string,
  addressType: number,
  // phoneNumberType: string
}


export interface State {
  allOrders: Orders[],
  currentOrder: Orders;
  postPayment: PaymentObject;
  isPurchaseActive: boolean;
  errors: HttpError[];
  loading: boolean;
}

const initialState: State = {
  allOrders: [],
  currentOrder: null,
  postPayment: null,
  isPurchaseActive: false,
  errors: [], //using array because we can add more reducers with error
  loading: false
};

export function orderReducer(state = initialState, action: OrderActions.OrderActions) { //TODO why are we storing orders again?
  switch (action.type) {
    case (OrderActions.FETCH_ORDER_SUCCESS):
      let fetchOrderSuccessErrorClear = state.errors;
      for (let i = 0; i < fetchOrderSuccessErrorClear.length; i++) {
        if (fetchOrderSuccessErrorClear[i].errorEffect === 'FETCH_ORDER') {
          fetchOrderSuccessErrorClear = fetchOrderSuccessErrorClear.splice(i, 1);
        }
      }

      if (action.payload.length == 0) {
        return {
          ...state,
          errors: fetchOrderSuccessErrorClear,
          loading: false
        }
      }
console.log('all orders',action.payload);

      return {
        ...state,
        allOrders: action.payload,
        errors: fetchOrderSuccessErrorClear,
        loading: false
      };

    case (OrderActions.POST_ORDER_SUCCESS):
      let postOrderSuccessErrorClear = state.errors;
      for (let i = 0; i < postOrderSuccessErrorClear.length; i++) {
        if (postOrderSuccessErrorClear[i].errorEffect === 'POST_ORDER_FORM') {
          postOrderSuccessErrorClear = postOrderSuccessErrorClear.splice(i, 1);
        }
      }
      console.log('success order', action.payload);
      return {
        ...state,
        currentOrder: action.payload,
        errors: postOrderSuccessErrorClear,
        loading: false
      };

    case (OrderActions.POST_PAYMENT):
      let postPaymentErrorClear = state.errors;
      for (let i = 0; i < postPaymentErrorClear.length; i++) {
        if (postPaymentErrorClear[i].errorEffect === 'POST_PAYMENT') {
          postPaymentErrorClear = postPaymentErrorClear.splice(i, 1);
        }
      }
      return {
        ...state,
        postPayment: action.payload,
        errors: postPaymentErrorClear        
      };

    // case (OrderActions.IS_PURCHASE_ACTIVE):
    //   console.log("IS_PURCHASE_ACTIVE");
    //   console.log(action.payload);
    //   if (action.payload) {
    //     return {
    //       postOrders: null,
    //       postPayment: null,
    //       isPurchaseActive: true,
    //       errors: []
    //     };
    //   }
    //   return {
    //     postOrders: null,
    //     postPayment: null,
    //     isPurchaseActive: false,
    //     errors: []
    //   };

    case (OrderActions.ORDER_ERROR):
      let orderErrorPush = state.errors;
      for (let i = 0; i < orderErrorPush.length; i++) {
        if (orderErrorPush[i].errorEffect === action.payload.errorEffect) {
          orderErrorPush[i] = action.payload;
          return {
            ...state,
            errors: orderErrorPush
          };
        }
      }
      orderErrorPush.push(action.payload);
      return {
        ...state,
        errors: orderErrorPush
      };
    case (OrderActions.EMPTY_ORDER):
      return {
        allOrders: [],
        currentOrder: null,
        postPayment: null,
        isPurchaseActive: state.isPurchaseActive,
        errors: [],
        loading: false
      };
    default:
      return state;
  }
}
