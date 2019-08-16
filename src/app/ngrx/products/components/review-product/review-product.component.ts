import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs/Subscription";
import { IProducts, ReviewLines } from '@root/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import { FetchActions } from 'app/ngrx/products/actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'review-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit, OnDestroy {
  @Input() product: IProducts;
  reviewLines$: Observable<ReviewLines[]>;
  private subscriptions: Subscription[] = [];

  average: number = 5;
  ratingObject: any = {};

  data: any[] = [];

  constructor(
    private store: Store<fromProducts.State>,
    public route: ActivatedRoute
  ) {
    const actionsSubscription = route.params
      .pipe(map(params => FetchActions.fetchReviewLines({ id: params.id })))
      .subscribe(action => store.dispatch(action));
    this.subscriptions.push(actionsSubscription);
  }

  ngOnInit() {
    this.reviewLines$ = this.store.pipe(select(fromProducts.getFetchReviewLines)) as Observable<ReviewLines[]>;

    this.data = [
      {
        star: 5,
        progress: 0,
        percent: 0
      },
      {
        star: 4,
        progress: 0,
        percent: 0
      },
      {
        star: 3,
        progress: 0,
        percent: 0
      },
      {
        star: 2,
        progress: 0,
        percent: 0
      },
      {
        star: 1,
        progress: 0,
        percent: 0
      }
    ];

    const reviewLinesSubscription = this.reviewLines$.subscribe(res => {

      let allRating = 0, count = 0;

      this.ratingObject = {
        fiveStars: 0,
        fourStars: 0,
        threeStars: 0,
        twoStars: 0,
        oneStar: 0,
        overAllRating: 0,
        ratingCount: 0,
      };

      res.map(data => {
        allRating += data.productRating;
        count += 1;
        switch (data.productRating) {
          case 5:
            this.ratingObject.fiveStars += 1; break;
          case 4:
            this.ratingObject.fourStars += 1; break;
          case 3:
            this.ratingObject.threeStars += 1; break;
          case 2:
            this.ratingObject.twoStars += 1; break;
          case 1:
            this.ratingObject.oneStar += 1; break;
          default: break;
        }
      });

      this.ratingObject.overAllRating = Math.ceil(allRating / count);
      this.ratingObject.ratingCount = count;

      this.data.map(i => {
        switch (i.star) {
          case 5:
            i.percent = this.ratingObject.fiveStars | 0;
            i.progress = i.percent > 0 ? 100 : 0; break;
          case 4:
            i.percent = this.ratingObject.fourStars | 0;
            i.progress = i.percent > 0 ? 100 : 0; break;
          case 3:
            i.percent = this.ratingObject.threeStars | 0;
            i.progress = i.percent > 0 ? 100 : 0; break;
          case 2:
            i.percent = this.ratingObject.twoStars | 0;
            i.progress = i.percent > 0 ? 100 : 0; break;
          case 1:
            i.percent = this.ratingObject.oneStar | 0;
            i.progress = i.percent > 0 ? 100 : 0; break;
          default:
            i.percent = 0;
            i.progress = 0; break;
        }
      })
    });
    this.subscriptions.push(reviewLinesSubscription);
  }

  private getDiffDays(date: Date) {

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var currentDate = new Date();
    var reviewedDate = new Date(date);

    var diffDays = Math.round(Math.abs((currentDate.getTime() - reviewedDate.getTime()) / (oneDay)));

    return diffDays;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }
}
