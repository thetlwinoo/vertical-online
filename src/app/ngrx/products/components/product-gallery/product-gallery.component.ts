import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, of, forkJoin, zip } from 'rxjs';
import { IProducts, IProductPhoto } from '@epm/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit, OnDestroy {
  photos$: Observable<any>;
  actionsSubscription: Subscription;

  @Input() product;

  images:any[];

  constructor(
    private store: Store<fromProducts.State>,
    public route: ActivatedRoute
  ) {
    this.actionsSubscription = route.params
      .pipe(map(params => FetchActions.fetchProductPhoto({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnInit() {
    this.photos$ = this.store.pipe(select(fromProducts.getFetchProductPhoto)) as Observable<any[]>;
  }

  ngAfterViewInit(){
    console.log('this.prod',this.product)
    if(this.product){
      this.product.stockItemsDTOList.map(stockItem=>{
        this.images.push({ source: stockItem.thumbnailUrl, alt: stockItem.name, title: stockItem.name });
      });
      console.log('this.images',this.images)
    }
  }
  ngOnDestroy(): void {
    this.actionsSubscription.unsubscribe();
  }

}
