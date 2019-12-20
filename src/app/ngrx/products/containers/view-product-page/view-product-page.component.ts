import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import * as fromProducts from 'app/ngrx/products/reducers';
import { ProductActions } from 'app/ngrx/products/actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-product-page.component.html',
  styleUrls: ['./view-product-page.component.scss']
})
export class ViewProductPageComponent implements OnDestroy {

  actionsSubscription: Subscription;

  constructor(store: Store<fromProducts.State>, route: ActivatedRoute) {
    console.log('view product page');
    // this.actionsSubscription = route.params
    //   .pipe(map(params => ProductActions.selectProduct({ id: params.id })))
    //   .subscribe(action => store.dispatch(action))
  }

  ngOnDestroy() {
    if (this.actionsSubscription) {
      this.actionsSubscription.unsubscribe();
    }
  }
}
