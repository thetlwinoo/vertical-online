import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Output() changeRating: EventEmitter<number> = new EventEmitter<number>();
  selectedRating: TreeNode[] = [];

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

  constructor() { }

  ngOnInit() { }

}
