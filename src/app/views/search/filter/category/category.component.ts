import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ProductTags, TagFilter } from '@root/models';
import { TreeNode } from 'primeng/api';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  @Input() categories: any[] = [];
  @Input() productCategories: any[] = [];
  @Output() selectedCategories: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedFiles: TreeNode[] = [];

  expand: boolean;

  constructor() {
    this.expand = true;
  }

  ngOnInit() {

  }

  nodeChange(event) {
    this.selectedCategories.emit(this.selectedFiles);
  }

  expandAll() {
    this.categories.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.categories.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

}
