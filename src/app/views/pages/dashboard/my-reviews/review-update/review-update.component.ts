import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { IPhotos, Photos, IOrderLines, IOrders, IOrderPackages } from '@eps/models';
import { Observable, Observer, Subject } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { PhotosService, OrderService } from '@eps/services';
import { select, Store } from '@ngrx/store';
import { OrderLineActions, OrderActions, OrderPackageActions } from 'app/ngrx/checkout/actions';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { SERVER_API_URL } from '@eps/constants';
import { UploadFile } from 'ng-zorro-antd/upload';
import { ImageUtils } from '@eps/services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '@eps/core';
import { Account } from '@eps/core/user/account.model';
import { filter, map, takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ReviewsProps, ReviewLinesProps } from '@eps/models/order-package-actions.model';

@Component({
  selector: 'app-review-update',
  templateUrl: './review-update.component.html',
  styleUrls: ['./review-update.component.scss'],
})
export class ReviewUpdateComponent implements OnInit, OnDestroy {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  orderPackage$: Observable<IOrderPackages>;
  orderPackage: IOrderPackages;
  orderLines$: Observable<IOrderLines[]>;
  saveOrderLineListSuccess$: Observable<boolean>;
  public orderLines: any[] = [];
  account: Account;
  fileTypes = 'image/png,image/jpeg';
  completedReview = true;
  previewImage: string | undefined = '';
  previewVisible = false;
  responseImageId = null;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    protected dataUtils: JhiDataUtils,
    protected imageUtils: ImageUtils,
    protected jhiAlertService: JhiAlertService,
    protected orderService: OrderService,
    protected elementRef: ElementRef,
    private accountService: AccountService,
    private store: Store<fromCheckout.State>,
    private msg: NzMessageService,
    private photosService: PhotosService
  ) {
    this.orderLines$ = store.pipe(select(fromCheckout.getOrderLinesFetched));
    this.orderPackage$ = store.pipe(select(fromCheckout.getSelectedOrderPackage));
    this.saveOrderLineListSuccess$ = store.pipe(select(fromCheckout.getSaveOrderLineListSuccess));
  }

  ngOnInit(): void {
    this.orderPackage$.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.orderPackage = { ...res };
      console.log('ORDER PACKAGE', res);
    });

    this.orderLines$.pipe(takeUntil(this.unsubscribe$)).subscribe((data: IOrderLines[]) => {
      this.orderLines = [];
      data.map(item => {
        this.orderLines.push({ ...item });
      });
      console.log('orders lines', this.orderLines);
    });

    this.accountService.identity().subscribe(account => {
      this.account = account;
    });

    // this.saveOrderLineListSuccess$.pipe(takeUntil(this.unsubscribe$)).subscribe(success => {
    //   console.log('success', success);
    //   if (success) {

    //     this.store.dispatch(OrderLineActions.fetchOrderLines({ orderPackageId: this.orderPackage.id }));
    //     this.msg.success('You have successfully reviewed');
    //   }
    // });
  }

  submitForm(): void {
    // console.log('submit', this.orderPackage, this.orderLines);

    const lineReviewList: ReviewLinesProps[] = [];

    this.orderLines.map(lineItem => {
      if (!lineItem.lineRating) {
        this.completedReview = false;
      }

      const lineReviewObject: ReviewLinesProps = {
        id: lineItem.id,
        lineRating: lineItem.lineRating,
        lineReview: lineItem.lineReview,
        reviewImageId: lineItem.reviewImageId,
      };

      lineReviewList.push(lineReviewObject);
    });

    const props: ReviewsProps = {
      id: this.orderPackage.id,
      completedReview: this.completedReview,
      customerReviewedOn: moment(),
      deliveryRating: this.orderPackage.deliveryRating,
      deliveryReview: this.orderPackage.deliveryReview,
      reviewAsAnonymous: this.orderPackage.reviewAsAnonymous,
      sellerRating: this.orderPackage.sellerRating,
      sellerReview: this.orderPackage.sellerReview,
      lineReviewList,
    };

    this.store.dispatch(OrderPackageActions.saveReviews({ props }));

    // this.store.dispatch(OrderLineActions.saveOrderLineList({ orderLineList: this.orderLines }));
  }

  beforeUpload = (file: UploadFile, _fileList: UploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  handleChange(info: { file: UploadFile }, entity): void {
    switch (info.file.status) {
      case 'uploading':
        entity.loading = true;
        break;
      case 'done':
        const photos: IPhotos = new Photos();
        photos.thumbnailUrl = info.file.response.thumbUrl;
        photos.originalUrl = info.file.response.url;
        photos.blobId = info.file.response.id;

        this.photosService
          .create(photos)
          .pipe(
            takeUntil(this.unsubscribe$),
            filter((res: HttpResponse<IPhotos>) => res.ok),
            map((res: HttpResponse<IPhotos>) => res.body)
          )
          .subscribe(res => {
            entity.reviewImageId = res.id;
            entity.reviewImageThumbnailUrl = res.thumbnailUrl;
          });
        break;
      case 'error':
        this.msg.error('Network error');
        entity.loading = false;
        break;
    }
  }

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
