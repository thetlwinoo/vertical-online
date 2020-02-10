import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { Subject, Observable } from "rxjs";
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from "@ngrx/store";
import * as fromTags from 'app/ngrx/tags/reducers';

@Component({
  selector: 'price-filter',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None
})
export class PriceComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() rangePrice: any;
  @Output() selectedPriceRange = new EventEmitter();
  private _unsubscribeAll: Subject<any>;
  priceRange$: Observable<number[]>;

  priceRange: number[];
  minPrice: number;
  maxPrice: number;

  expand: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromTags.State>,
  ) {
    this.expand = true;

    this._unsubscribeAll = new Subject();

    this.activatedRoute.params
      .pipe(
        takeUntil(this._unsubscribeAll),
        zip(this.activatedRoute.queryParams),
        map((payload) => {

          const keyword = payload[0].keyword == '_blank' ? '' : payload[0].keyword;
          const queryParams = payload[1];

          return FetchActions.fetchPriceRangeByTag({
            query: {
              keyword: keyword,
              category: queryParams.category
            }
          })
        })
      )
      .subscribe(action => this.store.dispatch(action));

    this.priceRange$ = store.pipe(select(fromTags.getFetchPriceRange));

    this.priceRange$.subscribe(data => {
      this.priceRange = data;

      if (this.priceRange.length >= 2) {
        this.minPrice = this.priceRange[0];
        this.maxPrice = this.priceRange[1];
      }

    })
  }

  ngOnInit() { }

  priceChanged(event: any) {
    this.selectedPriceRange.emit(event.values);
  }

}
