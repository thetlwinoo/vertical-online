import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Products, IProducts } from "@root/models";
import 'rxjs/add/operator/filter';
import { rootAnimations } from '@root/animations';

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
