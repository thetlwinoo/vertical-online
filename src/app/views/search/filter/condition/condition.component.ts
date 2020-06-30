import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit {
  @Output() changeCondition: EventEmitter<any[]> = new EventEmitter<any[]>();
  expand = true;

  condition = [
    { label: 'New Products', value: 'new', checked: true },
    { label: 'Used Item', value: 'used', checked: true },
  ];

  constructor() {}

  ngOnInit(): void {}

  checked(): void {
    console.log(this.condition);
  }

  log(event) {
    console.log(event);
  }
}
