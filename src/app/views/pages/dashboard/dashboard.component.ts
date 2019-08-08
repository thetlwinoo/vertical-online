import { Component, OnInit, OnDestroy } from '@angular/core';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';
import { AccountService } from 'app/core/auth/services/account.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  account: Account;
  activatedRouteSubscription: Subscription;
  pageTitle: string = null;

  constructor(
    private boxSidebarService: RootSidebarService,
    private accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
  ) {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
  }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.url.subscribe(() => {
      this.pageTitle = this.activatedRoute.snapshot.firstChild.data.title;
      if(this.activatedRoute.snapshot.firstChild.children.length>0 && this.activatedRoute.snapshot.firstChild.children[0].data){
        this.pageTitle = this.activatedRoute.snapshot.firstChild.children[0].data.pageTitle;
      }
    });
  }

  toggleSidebar(name): void {
    this.boxSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy() {
    if (this.activatedRouteSubscription) this.activatedRouteSubscription.unsubscribe();
  }
}
