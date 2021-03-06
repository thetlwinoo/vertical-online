import { Directive, ElementRef, OnDestroy, OnInit, Renderer2, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RootMatchMediaService } from '@vertical/services';

@Directive({
  selector: '.header-scroll',
})
export class HeaderScrollDirective implements OnInit, OnDestroy {
  isMobile = false;
  private _parent: any;
  private _grandParent: any;
  private _nativeElement: any;
  private unsubscribe$: Subject<any>;

  constructor(private _elementRef: ElementRef, private _rootMediaMatchService: RootMatchMediaService, private _renderer: Renderer2) {
    this.unsubscribe$ = new Subject();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if (this.isMobile) {
      if (window.pageYOffset >= 100) {
        this._renderer.addClass(this._nativeElement, 'bg-primary');
      } else {
        this._renderer.removeClass(this._nativeElement, 'bg-primary');
      }
    }
  }

  ngOnInit(): void {
    console.log('>>>> Header Scroll.l....');
    this._nativeElement = this._elementRef.nativeElement;
    this._parent = this._renderer.parentNode(this._elementRef.nativeElement);
    if (!this._parent) {
      return;
    }
    this._grandParent = this._renderer.parentNode(this._parent);

    this._rootMediaMatchService.onMediaChange.pipe(takeUntil(this.unsubscribe$)).subscribe(alias => {
      if (alias === 'xs') {
        this.isMobile = true;
        // this._renderer.removeClass(this._nativeElement, 'sticky-top');
        // this._renderer.addClass(this._nativeElement, 'fixed-top');
        this._renderer.removeClass(this._nativeElement, 'bg-primary');
      } else {
        this.isMobile = false;
        // this._renderer.removeClass(this._nativeElement, 'fixed-top');
        // this._renderer.addClass(this._nativeElement, 'sticky-top');
        this._renderer.addClass(this._nativeElement, 'bg-primary');
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
