import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ProductTags, TagFilter, IProductCategory } from '@root/models';
import { TreeNode } from 'primeng/api';
import { rootAnimations } from '@root/animations';
import { Observable, Subject, Subscription } from "rxjs";
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FetchActions } from 'app/ngrx/products/actions';
import { Store, select } from "@ngrx/store";
import * as fromProducts from 'app/ngrx/products/reducers';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: rootAnimations,
})
export class CategoryComponent implements OnInit {

  @Input() filter: any[] = [];
  @Input() productCategories: any[] = [];
  @Output() selectedCategories: EventEmitter<any> = new EventEmitter<any>();

  categories$: Observable<IProductCategory[]>;
  // selectedFiles: TreeNode[] = [];
  public selectedItems: any;
  private _unsubscribeAll: Subject<any>;
  expand: boolean;
  start: number = 0;
  end: number = 10;
  showInd: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromProducts.State>,
  ) {
    this.expand = true;

    this._unsubscribeAll = new Subject();

    this.activatedRoute.params
      .pipe(
        takeUntil(this._unsubscribeAll),
        map((params) => {
          return FetchActions.fetchCategories();
        })
      )
      .subscribe(action => this.store.dispatch(action));

    this.categories$ = store.pipe(select(fromProducts.getFetchCategories));
  }

  ngOnInit() {

  }

  toggleCollepse(allLength) {
    this.showInd = !this.showInd;
    this.end = this.showInd ? allLength : 10;
  }

  onChange(event){
    console.log('cag change',event)
  }
  // nodeChange(event) {
  //   this.selectedCategories.emit(this.selectedFiles);
  // }

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

}
