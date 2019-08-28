import { Component, Input } from '@angular/core';
import { Products, IProducts } from "@root/models";
import { deal } from '@root/config/owl-carousel';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.scss'],
  animations: rootAnimations
})
export class NewlyAddedComponent {
  @Input() data: IProducts[];
  @Input() loading;
  @Input() error;
  carousel: any;

  constructor() {
    this.carousel = deal;
  }
}
