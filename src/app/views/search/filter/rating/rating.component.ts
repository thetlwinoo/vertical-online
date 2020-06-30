import { ViewEncapsulation, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class RatingComponent implements OnInit {
  @Output() changeRating: EventEmitter<number> = new EventEmitter<number>();
  // selectedRating: TreeNode[] = [];
  expand: boolean;
  selectedValue: string;
  title = 'rating';

  data: any[] = [
    {
      star: 5,
    },
    {
      star: 4,
    },
    {
      star: 3,
    },
    {
      star: 2,
    },
    {
      star: 1,
    },
  ];

  constructor(private nzMessageService: NzMessageService) {
    this.expand = true;
  }

  ngOnInit(): void {}

  show(): void {
    this.nzMessageService.info('show message');
  }

  onKeyDown(event): void {
    console.log(event);
  }

  ratingChanged(event): void {
    console.log(event);
  }
}
