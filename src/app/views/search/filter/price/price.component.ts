import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from '@ngrx/store';
import * as fromTags from 'app/ngrx/tags/reducers';

@Component({
  selector: 'price-filter',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class PriceComponent implements OnInit, OnDestroy {
  @Output() selectedPriceRange: EventEmitter<any> = new EventEmitter<any>();
  title = 'price range';
  priceRange$: Observable<number[]>;

  priceRange: number[];
  minPrice: number;
  maxPrice: number;

  private unsubscribeAll: Subject<any>;
  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromTags.State>) {
    this.unsubscribeAll = new Subject();

    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribeAll),
        zip(this.activatedRoute.queryParams),
        map(payload => {
          const keyword = payload[0].keyword === '_blank' ? '' : payload[0].keyword;
          const queryParams = payload[1];

          return FetchActions.fetchPriceRangeByTag({
            query: {
              keyword,
              category: queryParams.category,
            },
          });
        })
      )
      .subscribe(action => this.store.dispatch(action));

    this.priceRange$ = store.pipe(select(fromTags.getFetchPriceRange));

    this.priceRange$.pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      this.priceRange = data;

      if (this.priceRange.length >= 2) {
        this.minPrice = this.priceRange[0];
        this.maxPrice = this.priceRange[1];
      }
    });
  }

  ngOnInit(): void {}

  priceChanged(): void {
    this.selectedPriceRange.emit(this.priceRange);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
