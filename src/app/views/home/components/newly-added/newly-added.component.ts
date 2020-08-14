import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Products, IProducts } from '@vertical/models';
import { deal } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';

@Component({
  selector: 'newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class NewlyAddedComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  carousel: any;
  ghosts = [];
  title = 'newly added';

  constructor() {
    this.carousel = deal;
    this.ghosts = new Array(10);
  }
}
