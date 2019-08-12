import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '@root/services';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit {
  crumbs$: Observable<MenuItem[]>;
  private _unsubscribeAll: Subject<any>;
  home: MenuItem;

  constructor(
    private breadcrumb: BreadcrumbService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.crumbs$ = this.breadcrumb.crumbs$;
    this.home = {icon: 'pi pi-home', routerLink: ['/home']};
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
