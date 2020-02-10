import { Component, Input } from '@angular/core';
import { Products, IProducts } from "@eps/models";
import { deal } from '@eps/config/owl-carousel';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.scss'],
  animations: rootAnimations,
})
export class NewlyAddedComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  carousel: any;
  ghosts = [];

  constructor() {
    this.carousel = deal;
    this.ghosts = new Array(10);
  }
}
