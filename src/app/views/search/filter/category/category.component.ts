import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, OnDestroy } from '@angular/core';
import { IProductCategory } from '@eps/models';
import { TreeNode } from 'primeng/api';
import { rootAnimations } from '@eps/animations';
import { Observable, Subject, Subscription } from "rxjs";
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from "@ngrx/store";
import * as fromTags from 'app/ngrx/tags/reducers';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: rootAnimations,
})
export class CategoryComponent implements OnInit, OnDestroy {

  @Input() filter: any[] = [];
  @Input() productCategories: any[] = [];
  @Output() selectedCategories: EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribeAll: Subject<any>;
  categories$: Observable<any[]>;
  selectedFiles: TreeNode[] = [];
  public selectedItems: any;
  expand: boolean;
  start: number = 0;
  end: number = 10;
  showInd: boolean = false;

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
          this.store.dispatch(FetchActions.selectCategory({ id: queryParams.category }));

          return FetchActions.fetchSubCategoriesByTag({
            query: {
              keyword: keyword,
              category: queryParams.category
            }
          });
        })
      )
      .subscribe(action => this.store.dispatch(action));

    this.categories$ = store.pipe(select(fromTags.getCategoriesTree));
  }

  ngOnInit() {

  }

  toggleCollepse(allLength) {
    this.showInd = !this.showInd;
    this.end = this.showInd ? allLength : 10;
  }

  nodeChange(event) {
    this.selectedCategories.emit(this.selectedFiles);
  }

  // expandAll() {
  //   this.categories.forEach(node => {
  //     this.expandRecursive(node, true);
  //   });
  // }

  // collapseAll() {
  //   this.categories.forEach(node => {
  //     this.expandRecursive(node, false);
  //   });
  // }

  // private expandRecursive(node: TreeNode, isExpand: boolean) {
  //   node.expanded = isExpand;
  //   if (node.children) {
  //     node.children.forEach(childNode => {
  //       this.expandRecursive(childNode, isExpand);
  //     });
  //   }
  // }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
