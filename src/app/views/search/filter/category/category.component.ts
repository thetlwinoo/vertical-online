import { Component, Input, OnInit, ViewEncapsulation, OnDestroy, OnChanges } from '@angular/core';
import { rootAnimations } from '@vertical/animations';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
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
  title = 'categories';
  categoryNodes;

  private unsubscribeAll: Subject<any> = new Subject();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('categories', this.categories);
  }

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
