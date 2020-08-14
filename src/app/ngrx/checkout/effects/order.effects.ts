import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, filter, mergeMap, tap } from 'rxjs/operators';
import { IOrders, IOrderLines, OrderLines, IOrderPackages } from '@vertical/models';
import { OrderActions, CartActions, OrderLineActions, OrderPackageActions } from '../actions';
import { OrderService, OrderLinesService } from '@vertical/services';
import { OrderPackagesService } from '@vertical/services/e-commerce/order-packages.service';

@Injectable()
export class OrderEffects {
  fetchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.fetchOrder),
      switchMap(({ query }) =>
        this.orderService.getAllOrders(query).pipe(
          filter((res: HttpResponse<IOrders[]>) => res.ok),
          map((res: HttpResponse<IOrders[]>) => {
            res.body.map(lineItem => {
              lineItem.orderDetails = JSON.parse(lineItem.orderDetails);
            });

            return OrderActions.fetchOrderSuccess({ payload: res });
          }),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchTrackOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.fetchTrackOrder),
      switchMap(({ query }) =>
        this.orderService.query(query).pipe(
          filter((res: HttpResponse<IOrders[]>) => res.ok),
          map((res: HttpResponse<IOrders[]>) => OrderActions.fetchTrackOrderSuccess({ orders: res.body })),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  getCustomerOrdersReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.fetchCustomerOrdersReviews),
      switchMap(({ query }) =>
        this.orderService.getCustomerOrdersReviews(query).pipe(
          filter((res: HttpResponse<IOrders[]>) => res.ok),
          map((res: HttpResponse<IOrders[]>) => {
            res.body.map(lineItem => {
              lineItem.orderDetails = JSON.parse(lineItem.orderDetails);
            });

            return OrderActions.fetchCustomerOrdersReviewsSuccess({ payload: res });
          }),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  getOrderPackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderPackageActions.getOrderPackage),
      switchMap(({ id }) =>
        this.orderPackageService.find(id).pipe(
          filter((res: HttpResponse<IOrderPackages>) => res.ok),
          map((res: HttpResponse<IOrderPackages>) => {
            res.body.orderPackageDetails = JSON.parse(res.body.orderPackageDetails);
            return OrderPackageActions.getOrderPackageSuccess({ orderPackage: res.body });
          }),
          catchError(err => of(OrderPackageActions.orderPackageError({ errorMsg: err.message })))
        )
      )
    )
  );

  fetchOrderLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderLineActions.fetchOrderLines),
      switchMap(props =>
        this.orderLinesService
          .query({
            'orderPackageId.equals': props.orderPackageId,
          })
          .pipe(
            filter((res: HttpResponse<IOrderLines[]>) => res.ok),
            switchMap((res: HttpResponse<IOrderLines[]>) => [OrderLineActions.fetchOrderLinesSuccess({ orderLines: res.body })]),
            catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
          )
      )
    )
  );

  postOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.postOrder),
      mergeMap(({ order }) =>
        this.orderService.postOrder(order).pipe(
          filter((res: HttpResponse<IOrders>) => res.ok),
          switchMap((res: HttpResponse<IOrders>) => [
            OrderActions.emptyOrder(),
            OrderActions.postOrderSuccess({ order: res.body }),
            OrderActions.fetchTrackOrder({ query: { 'customerId.equals': res.body.customerId, page: 0, size: 3 } }),
          ]),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  saveOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.saveOrder),
      mergeMap(({ order }) =>
        this.orderService.update(order).pipe(
          filter((res: HttpResponse<IOrders>) => res.ok),
          switchMap((res: HttpResponse<IOrders>) => [OrderActions.selectOrder({ order: res.body })]),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  saveOrderPackage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderPackageActions.saveOrderPackage),
      mergeMap(({ orderPackage }) =>
        this.orderPackageService.update(orderPackage).pipe(
          filter((res: HttpResponse<IOrderPackages>) => res.ok),
          switchMap((res: HttpResponse<IOrderPackages>) => [OrderPackageActions.saveOrderPackageSuccess({ orderPackage: res.body })]),
          catchError(err => of(OrderPackageActions.orderPackageError({ errorMsg: err.message })))
        )
      )
    )
  );

  saveReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderPackageActions.saveReviews),
      mergeMap(({ props }) =>
        this.orderPackageService.updateReview(props).pipe(
          filter((res: HttpResponse<IOrderPackages>) => res.ok),
          switchMap((res: HttpResponse<IOrderPackages>) => [
            OrderPackageActions.saveReviewsSuccess({ orderPackage: res.body }),
            OrderLineActions.fetchOrderLines({ orderPackageId: props.id }),
          ]),
          catchError(err => of(OrderPackageActions.orderPackageError({ errorMsg: err.message })))
        )
      )
    )
  );

  saveOrderLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderLineActions.saveOrderLine),
      mergeMap(({ orderLine }) =>
        this.orderLinesService.updateExtend(orderLine).pipe(
          filter((res: HttpResponse<IOrderLines>) => res.ok),
          map((res: HttpResponse<IOrderLines>) => OrderLineActions.saveOrderLineSuccess({ orderLine: res.body })),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  cancelOrderLine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderLineActions.cancelOrderLine),
      mergeMap(({ id }) =>
        this.orderLinesService.cancelOrderLine(id).pipe(
          filter((res: HttpResponse<any>) => res.ok),
          mergeMap((res: HttpResponse<any>) => {
            console.log(res.body);
            const response = res.body;
            if (response.status === 'success') {
              return [
                OrderLineActions.cancelOrderLineSuccess({ response: res.body }),
                OrderActions.fetchOrder(null),
                OrderActions.fetchTrackOrder({ query: { 'customerId.equals': response.customerId, page: 0, size: 3 } }),
              ];
            } else {
              return [OrderActions.orderError({ errorMsg: response.error })];
            }
          }),
          catchError(err => of(OrderActions.orderError({ errorMsg: err.message })))
        )
      )
    )
  );

  // saveOrderLineList$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(OrderLineActions.saveOrderLineList),
  //     mergeMap(({ orderLineList }) => orderLineList.map(orderLine => OrderLineActions.saveOrderLine({ orderLine }))),
  //     switchMap(res => {
  //       console.log('save line list', res);
  //       return [OrderLineActions.saveOrderLineListSuccess({ success: true })];
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private orderPackageService: OrderPackagesService,
    private orderLinesService: OrderLinesService
  ) {}
}
