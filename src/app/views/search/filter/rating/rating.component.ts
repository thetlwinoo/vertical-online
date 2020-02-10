import { ViewEncapsulation, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  animations: rootAnimations
})
export class RatingComponent implements OnInit {
  @Output() changeRating: EventEmitter<number> = new EventEmitter<number>();
  selectedRating: TreeNode[] = [];
  expand: boolean;
  selectedValue: string;

  data: any[] = [
    {
      star: 5
    },
    {
      star: 4
    },
    {
      star: 3
    },
    {
      star: 2
    },
    {
      star: 1
    }
  ];

  constructor() {
    this.expand = true;
  }

  ngOnInit() { }

}
