import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { IProducts, ReviewLines, IReviewLines, IOrderLines, IPeople } from '@eps/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { FetchActions } from 'app/ngrx/products/actions';
import { ActivatedRoute } from '@angular/router';
import { SERVER_API_URL } from '@eps/constants';
import { map, takeUntil } from 'rxjs/operators';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'review-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss'],
})
export class ReviewProductComponent implements OnInit, OnDestroy {
  @Input() productName: string;
  @Input() ratings: any;
  @Input() reviews: any[];

  people$: Observable<IPeople>;
  people: IPeople;

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  average = 5;
  ratingObject: any = {};

  stars = [5, 4, 3, 2, 1];

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromProducts.State>, public route: ActivatedRoute, private authStore: Store<fromAuth.State>) {
    this.people$ = this.authStore.pipe(select(fromAuth.getPeopleFetched));
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
    });
  }

  getPercentage(val): number {
    switch (val) {
      case 5:
        return this.ratings.fiveStarsPercentage;
        break;
      case 4:
        return this.ratings.fourStarsPercentage;
        break;
      case 3:
        return this.ratings.threeStarsPercentage;
        break;
      case 2:
        return this.ratings.twoStarsPercentage;
        break;
      case 1:
        return this.ratings.oneStarsPercentage;
        break;
    }
  }

  getRate(val): number {
    switch (val) {
      case 5:
        return this.ratings.fiveStars;
        break;
      case 4:
        return this.ratings.fourStars;
        break;
      case 3:
        return this.ratings.threeStars;
        break;
      case 2:
        return this.ratings.twoStars;
        break;
      case 1:
        return this.ratings.oneStars;
        break;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getDistanceDate(date): string {
    return formatDistance(new Date(), new Date(date));
  }
}
