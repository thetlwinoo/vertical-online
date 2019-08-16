import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';

// import * as fromApp from "app/ngrx/app.reducers";
// import { Store } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
import { Products, IProducts } from "@root/models";
// import { Subscription } from "rxjs/Subscription";
// import * as ShowcaseActions from 'app/ngrx/showcase/showcase.actions';
import { deal } from '@root/config/owl-carousel';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.scss'],
  animations: rootAnimations
})
export class NewlyAddedComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;

  // showcaseState: Observable<{ newlyAdded: IProducts[], mostSelling: IProducts[], interested: IProducts[] }>;
  // private subscriptions: Subscription[] = [];
  // isFetched: boolean = false;
  carousel: any;

  constructor(
    // private store: Store<fromApp.AppState>    
  ) {
    this.carousel = deal;
  }
}
