import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss'],
})
export class Layout1Component implements OnInit {
  // crumbs$: Observable<MenuItem[]>;
  // home: MenuItem;

  private unsubscribeAll: Subject<any>;
  constructor() {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // this.crumbs$ = this.breadcrumb.crumbs$;
    // this.home = { icon: 'pi pi-home', routerLink: ['/home'] };
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
