import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Products, IProducts } from "@epm/models";
import 'rxjs/add/operator/filter';
import { rootAnimations } from '@epm/animations';

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
}
