import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { of } from "rxjs";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, switchMap } from 'rxjs/operators';
// import { PostOrdersObject } from 'app/store/order/order.reducer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  currentRoute: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(
          () =>
            (this.route.firstChild && this.route.firstChild.data) ||
            of({}),
        ),
      )
      .subscribe(params => {
        if (params.route) {
          this.currentRoute = params.route;
        }
      });
  }

  ngOnInit() {    
  }

  ngOnDestroy() {
  }  

}
