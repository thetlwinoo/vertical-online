import { Component, ChangeDetectionStrategy, TemplateRef, Input, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vs-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VSPanelComponent {
  @HostBinding('class') class = 'vs-panel';

  @Input() title: string | TemplateRef<any>;
  @Input() subTitle: string | TemplateRef<any>;

  @Input() more: boolean;

  show = false;

  toggle(el?: HTMLElement): void {
    this.show = !this.show;

    // if (!this.show) {
    //   el.scrollTo({ top: y, behavior: 'smooth' });
    // }
  }
}
