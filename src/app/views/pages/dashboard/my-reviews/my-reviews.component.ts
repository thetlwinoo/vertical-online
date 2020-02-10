import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { IProducts, IOrders, Orders, OrderLines } from '@eps/models';
import { ReviewsService } from '@eps/services';
import { AccountService } from '@eps/services/core/auth/account.service';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  navReviews: any[];
  activeNav: string;

  reviewedInd: boolean = false;
  // orderedProducts: any[];
  orders: IOrders[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected reviewsService: ReviewsService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    private router: Router
  ) { }

  loadAll() {
    this.reviewsService
      .getOrderedProducts()
      .pipe(
        filter((res: HttpResponse<IOrders[]>) => res.ok),
        map((res: HttpResponse<IOrders[]>) => res.body)
      )
      .subscribe((res: any[]) => {
        this.orders = res;
        console.log('reviews products', this.orders);
      },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.navReviews = [
      {
        label: 'To Be Reviewed',
        reviewed: false
      },
      {
        label: 'History',
        reviewed: true
      }
    ];
    this.activeNav = this.navReviews[0];

    this.loadAll();
    this.accountService.identity().then(account => {
      if (account) {
        this.currentAccount = account;
      }
    });
    this.registerChangeInReviews();
  }

  onChangeNav(event) {
    this.activeNav = event;
    this.reviewedInd = event.reviewed;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProducts) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInReviews() {
    this.eventSubscriber = this.eventManager.subscribe('reviewsListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  onClickReview(orderId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'orderId': orderId }
      // fragment: 'anchor'
    };
    console.log('navigationExtras', navigationExtras)
    this.router.navigate(['/pages/dashboard/my-reviews/new'], navigationExtras);
  }
}
