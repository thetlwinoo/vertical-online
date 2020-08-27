import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootMatchMediaService } from '@vertical/services';
import { RootMatSidenavHelperService } from '@vertical/directives/root-mat-sidenav/root-mat-sidenav.service';

@Directive({
  selector: '[rootMatSidenavHelper]',
})
export class RootMatSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.mat-is-locked-open')
  isLockedOpen: boolean;

  @Input()
  rootMatSidenavHelper: string;

  @Input()
  matIsLockedOpen: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _rootMatchMediaService: RootMatchMediaService,
    private _rootMatSidenavHelperService: RootMatSidenavHelperService,
    private _matSidenav: MatSidenav,
    private _mediaObserver: MediaObserver
  ) {
    this.isLockedOpen = true;

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Register the sidenav to the service
    this._rootMatSidenavHelperService.setSidenav(this.rootMatSidenavHelper, this._matSidenav);

    if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
      this.isLockedOpen = true;
      this._matSidenav.mode = 'side';
      this._matSidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this._matSidenav.mode = 'over';
      this._matSidenav.toggle(false);
    }

    this._rootMatchMediaService.onMediaChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
        this.isLockedOpen = true;
        this._matSidenav.mode = 'side';
        this._matSidenav.toggle(true);
      } else {
        this.isLockedOpen = false;
        this._matSidenav.mode = 'over';
        this._matSidenav.toggle(false);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

@Directive({
  selector: '[rootMatSidenavToggler]',
})
export class RootMatSidenavTogglerDirective {
  @Input()
  rootMatSidenavToggler: string;

  constructor(private _rootMatSidenavHelperService: RootMatSidenavHelperService) {}

  @HostListener('click')
  onClick(): void {
    this._rootMatSidenavHelperService.getSidenav(this.rootMatSidenavToggler).toggle();
  }
}
