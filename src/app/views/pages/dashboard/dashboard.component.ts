import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RootSidebarService } from '@eps/components/sidebar/sidebar.service';
import { AccountService } from '@eps/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Account } from '@eps/core/user/account.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, OnDestroy {
  account: Account;
  activatedRouteSubscription: Subscription;
  pageTitle: string = null;
  isCollapsed = false;

  constructor(
    private rootSidebarService: RootSidebarService,
    private accountService: AccountService,
    protected activatedRoute: ActivatedRoute
  ) {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.url.subscribe(() => {
      this.pageTitle = this.activatedRoute.snapshot.firstChild.data.title;
      if (this.activatedRoute.snapshot.firstChild.children.length > 0 && this.activatedRoute.snapshot.firstChild.children[0].data) {
        this.pageTitle = this.activatedRoute.snapshot.firstChild.children[0].data.pageTitle;
      }
    });
  }

  toggleSidebar(name): void {
    // this.rootSidebarService.getSidebar(name).toggleOpen();
  }

  ngOnDestroy(): void {
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }
}
