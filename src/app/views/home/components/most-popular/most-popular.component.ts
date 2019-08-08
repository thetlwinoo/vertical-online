import { Component, OnInit } from '@angular/core';
import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as ShowcaseActions from 'app/ngrx/showcase/showcase.actions';
import { Products, IProducts } from 'app/core/e-commerce/_models';
import { deal } from '@root/config/owl-carousel';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {
  showcaseState: Observable<{ newlyAdded: IProducts[], mostSelling: IProducts[], interested: IProducts[] }>;
  isFetched: boolean = false;
  carousel: any;
  private subscriptions: Subscription[] = [];
  constructor(
    private store: Store<fromApp.AppState>
  ) {
    this.carousel = deal;
  }

  ngOnInit() {
    this.showcaseState = this.store.select('showcase');
    const showcaseSubscription = this.showcaseState
      .filter(data => data.mostSelling.length == 0 && !this.isFetched)
      .subscribe(
        data => {
          this.store.dispatch(new ShowcaseActions.FetchMostSelling());
          this.isFetched = true;
        }
      );

    this.subscriptions.push(showcaseSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }

}
