import { ViewEncapsulation, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductColor, ColorFilter } from '@root/models';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ColorComponent implements OnInit {
  public selectedColors: any;
  expand: boolean;
  public activeItem: any = '';

  // Using Input and Output EventEmitter
  @Input() colorsFilters: ColorFilter[] = [];
  @Output() changedColorFilters: EventEmitter<ColorFilter[]> = new EventEmitter<ColorFilter[]>();

  constructor() {
    this.expand = true;
   }

  ngOnInit() { }
}
