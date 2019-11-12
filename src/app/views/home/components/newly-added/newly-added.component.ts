import { Component, Input } from '@angular/core';
import { Products, IProducts } from "@epm/models";
import { deal } from '@epm/config/owl-carousel';
import { rootAnimations } from '@epm/animations';

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
