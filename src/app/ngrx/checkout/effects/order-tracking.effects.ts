import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import { IOrderTracking } from '@eps/models';
import { OrderTrackingActions } from '../actions';
import { OrderTrackingService } from '@eps/services';

@Injectable()
export class OrderTrackingEffects {
  fetchOrderTracking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderTrackingActions.fetchOrderTracking),
      switchMap(({ query }) =>
        this.orderTrackingService.query(query).pipe(
          filter((res: HttpResponse<IOrderTracking[]>) => res.ok),
          map((res: HttpResponse<IOrderTracking[]>) => OrderTrackingActions.fetchOrderTrackingSuccess({ orderTrackings: res.body })),
          catchError(err => of(OrderTrackingActions.orderTrackingError({ errorMsg: err.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private router: Router, private orderTrackingService: OrderTrackingService) {}
}
