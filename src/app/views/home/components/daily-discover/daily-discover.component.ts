import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Products, IProducts } from "@root/models";
import { Subscription } from "rxjs/Subscription";
import * as ShowcaseActions from 'app/ngrx/showcase/showcase.actions';
import 'rxjs/add/operator/filter';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'daily-discover',
  templateUrl: './daily-discover.component.html',
  styleUrls: ['./daily-discover.component.scss'],
  animations: rootAnimations
})
export class DailyDiscoverComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  // showcaseState: Observable<{ newlyAdded: IProducts[], mostSelling: IProducts[], interested: IProducts[], dailyDiscover: IProducts[] }>;
  // private subscriptions: Subscription[] = [];
  // isFetched: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // this.showcaseState = this.store.select('showcase');
    // const showcaseSubscription = this.showcaseState
    //   .filter(data => data.dailyDiscover.length == 0 && !this.isFetched)
    //   .subscribe(
    //     data => {
    //       this.store.dispatch(new ShowcaseActions.FetchDailyDiscover());
    //       this.isFetched = true;
    //     }
    //   );

    // this.subscriptions.push(showcaseSubscription);
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(el => {
    //   if (el) el.unsubscribe();
    // });
  }
}
