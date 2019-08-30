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
  public selectedItems: any;
  expand: boolean;
  public activeItem: any = '';

  start: number = 0;
  end: number = 10;
  showInd: boolean = false;
  // Using Input and Output EventEmitter
  @Input() filter: any[] = [];
  @Output() selectedColors: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.expand = true;
  }

  ngOnInit() { }

  toggleCollepse(allLength) {
    this.showInd = !this.showInd;
    this.end = this.showInd ? allLength : 10;
  }

  onChange(event){
    console.log('color change',event)
  }
}
