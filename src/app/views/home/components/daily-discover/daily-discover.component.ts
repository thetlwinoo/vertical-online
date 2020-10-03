import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Products, IProducts } from '@vertical/models';
import 'rxjs/add/operator/filter';
import { rootAnimations } from '@vertical/animations';

@Component({
  selector: 'daily-discover',
  templateUrl: './daily-discover.component.html',
  styleUrls: ['./daily-discover.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class DailyDiscoverComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  ghosts = [];
  title = 'daily discover';

  constructor() {
    this.ghosts = new Array(18);
  }

  seeAll(): void {}
}
