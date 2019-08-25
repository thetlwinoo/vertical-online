import { Component, OnInit } from '@angular/core';
import { IOrders } from '@root/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'success-form',
  templateUrl: './success-form.component.html',
  styleUrls: ['./success-form.component.scss']
})
export class SuccessFormComponent implements OnInit {
  orders: IOrders;
  activeIds: any[] = [];
  constructor(
    protected activatedRoute: ActivatedRoute
  ) {
    const activatedRouteSubscription = this.activatedRoute.data.subscribe(({ orders }) => {
      this.orders = orders;
      console.log('Success Orders', this.orders)
    });
  }

  ngOnInit() {
  }

}
