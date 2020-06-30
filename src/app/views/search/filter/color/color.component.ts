import { ViewEncapsulation, Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from '@ngrx/store';
import * as fromTags from 'app/ngrx/tags/reducers';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ColorComponent implements OnInit, OnDestroy {
  @Output() selectedColors: EventEmitter<any> = new EventEmitter<any>();
  colors$: Observable<string[]>;
  title = 'color family';

  private unsubscribeAll: Subject<any> = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromTags.State>) {
    // this.expand = true;

    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribeAll),
        zip(this.activatedRoute.queryParams),
        map(payload => {
          const keyword = payload[0].keyword === '_blank' ? '' : payload[0].keyword;
          const queryParams = payload[1];

          return FetchActions.fetchColorsByTag({
            query: {
              keyword,
              category: queryParams.category,
            },
          });
        })
      )
      .subscribe(action => this.store.dispatch(action));

    this.colors$ = store.pipe(select(fromTags.getFetchColors));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
