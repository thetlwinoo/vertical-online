import { ViewEncapsulation, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { rootAnimations } from '@root/animations';
import { Subject, Observable } from "rxjs";
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from "@ngrx/store";
import * as fromTags from 'app/ngrx/tags/reducers';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ColorComponent implements OnInit {
  @Output() selectedColors: EventEmitter<any> = new EventEmitter<any>();
  private _unsubscribeAll: Subject<any>;
  colors$: Observable<string[]>;
  public selectedItems: any;
  expand: boolean;
  public activeItem: any = '';

  start: number = 0;
  end: number = 10;
  showInd: boolean = false;
  // Using Input and Output EventEmitter


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

          return FetchActions.fetchColorsByTag({
            query: {
              keyword: keyword,
              category: queryParams.category
            }
          })
        })
      )
      .subscribe(action => this.store.dispatch(action));

    this.colors$ = store.pipe(select(fromTags.getFetchColors));
  }

  ngOnInit() { }

  toggleCollepse(allLength) {
    this.showInd = !this.showInd;
    this.end = this.showInd ? allLength : 10;
  }
}
