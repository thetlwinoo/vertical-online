import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Products, IProducts } from "@eps/models";
import 'rxjs/add/operator/filter';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'daily-discover',
  templateUrl: './daily-discover.component.html',
  styleUrls: ['./daily-discover.component.scss'],
  animations: rootAnimations
})
export class DailyDiscoverComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  ghosts = [];

  constructor() {
    this.ghosts = new Array(18);
  }
}
