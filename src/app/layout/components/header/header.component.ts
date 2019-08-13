import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('headerNav', { static: false }) headerNav: ElementRef;
  isMobile: boolean;
  constructor(
    private _platform: Platform
  ) { }

  ngOnInit() {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.isMobile = true;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if (this.isMobile) {
      if (window.pageYOffset >= 100) {
        this.headerNav.nativeElement.classList.add('bg-dark');
      }
      else {
        this.headerNav.nativeElement.classList.remove('bg-dark');
      }
    }

  }
}
