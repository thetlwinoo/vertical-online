import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IProducts } from '@eps/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';

@Component({
  selector: 'interested-product',
  templateUrl: './interested-product.component.html',
  styleUrls: ['./interested-product.component.scss']
})
export class InterestedProductComponent implements OnInit {
  interested$: Observable<IProducts[]>;
  constructor(
    private store: Store<fromProducts.State>,
  ) {
    this.interested$ = this.store.pipe(select(fromProducts.getFetchInterested)) as Observable<IProducts[]>;
  }

  ngOnInit() {
    this.store.dispatch(FetchActions.fetchInterested());
  }

}
