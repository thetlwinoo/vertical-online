import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProducts } from '@root/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit, OnDestroy {
  @Input() product: IProducts;
  relatedProducts$: Observable<IProducts[]>;
  actionsSubscription: Subscription;

  constructor(
    private store: Store<fromProducts.State>,
    public route: ActivatedRoute
  ) {
    this.actionsSubscription = route.params
      .pipe(map(params => FetchActions.fetchRelated({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnInit() {
    this.relatedProducts$ = this.store.pipe(select(fromProducts.getFetchRelatedProducts)) as Observable<IProducts[]>;
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
