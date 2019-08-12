import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductTags, TagFilter } from '@root/models';
declare var $: any;
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
  @Output() changeCondition: EventEmitter<any[]> = new EventEmitter<any[]>();
  selectedCondition: TreeNode[] = [];

  constructor() { }

  ngOnInit() {
  }

}
