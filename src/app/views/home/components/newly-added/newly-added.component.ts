import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';

import * as fromApp from "app/ngrx/app.reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Products, IProducts } from "app/core/e-commerce/_models";
import { Subscription } from "rxjs/Subscription";
import * as ShowcaseActions from 'app/ngrx/showcase/showcase.actions';
import { deal } from '@root/config/owl-carousel';

@Component({
  selector: 'newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.scss']
})
export class NewlyAddedComponent implements OnInit, OnDestroy {
  @Input() searching = false;
  @Input() error = '';

  showcaseState: Observable<{ newlyAdded: IProducts[], mostSelling: IProducts[], interested: IProducts[] }>;
  private subscriptions: Subscription[] = [];
  isFetched: boolean = false;
  carousel: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    this.carousel = deal;
  }

  ngOnInit() {
    this.showcaseState = this.store.select('showcase');
    const showcaseSubscription = this.showcaseState
      .filter(data => data.newlyAdded.length == 0 && !this.isFetched)
      .subscribe(
        data => {
          this.store.dispatch(new ShowcaseActions.FetchNewlyAdded());
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
