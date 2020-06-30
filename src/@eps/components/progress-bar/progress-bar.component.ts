import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootProgressBarService } from '@eps/components/progress-bar/progress-bar.service';

@Component({
  selector: 'root-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RootProgressBarComponent implements OnInit, OnDestroy {
  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number;
  visible: boolean;

  private unsubscribe$: Subject<any>;

  constructor(private _rootProgressBarService: RootProgressBarService) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this._rootProgressBarService.bufferValue.pipe(takeUntil(this.unsubscribe$)).subscribe(bufferValue => {
      this.bufferValue = bufferValue;
    });

    this._rootProgressBarService.mode.pipe(takeUntil(this.unsubscribe$)).subscribe(mode => {
      this.mode = mode;
    });

    this._rootProgressBarService.value.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.value = value;
    });

    this._rootProgressBarService.visible.pipe(takeUntil(this.unsubscribe$)).subscribe(visible => {
      this.visible = visible;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
