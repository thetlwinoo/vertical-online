import { Component, ChangeDetectionStrategy, TemplateRef, Input, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vs-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VSPanelListComponent {
  @HostBinding('class') class = 'vs-panel-list';

  @Input() title: string | TemplateRef<any>;
  @Input() subTitle: string | TemplateRef<any>;

  @Input() more: boolean;

  show = false;

  toggle(el?: HTMLElement): void {
    this.show = !this.show;
  }
}
