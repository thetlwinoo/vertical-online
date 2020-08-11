import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { IProductCategory } from '@eps/models';
import { rootAnimations } from '@eps/animations';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from '@ngrx/store';
import * as fromTags from 'app/ngrx/tags/reducers';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class CategoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() categories;
  // categories$: Observable<any[]>;
  title = 'categories';
  categoryNodes;

  private unsubscribeAll: Subject<any> = new Subject();

  constructor(private router: Router) {
    // this.activatedRoute.params
    //   .pipe(
    //     takeUntil(this.unsubscribeAll),
    //     zip(this.activatedRoute.queryParams),
    //     map(payload => {
    //       const keyword = payload[0].keyword === '_blank' ? '' : payload[0].keyword;
    //       const queryParams = payload[1];
    //       this.store.dispatch(FetchActions.selectCategory({ id: queryParams.category }));
    //       return FetchActions.fetchCategoriesByTag({
    //         query: {
    //           keyword,
    //           category: queryParams.category,
    //         },
    //       });
    //     })
    //   )
    //   .subscribe(action => this.store.dispatch(action));
    // this.categories$ = store.pipe(select(fromTags.getCategoriesTree));
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

  categorySelect(event): void {
    console.log(event);

    if (event.keys.length > 0 && event.node.origin.isLeaf) {
      this.router.navigate(['/search'], {
        queryParams: { categoryId: event.keys[0] },
      });
    }
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
