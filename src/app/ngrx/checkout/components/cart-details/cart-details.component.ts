/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy, ViewContainerRef } from '@angular/core';
import {
  AddToCartProps,
  ReduceFromCartProps,
  ChangedAddToOrderProps,
  ChangedOrderAllProps,
  IPeople,
  IAddresses,
  Addresses,
} from '@vertical/models';
import { SERVER_API_URL } from '@vertical/constants';
import { NzMessageService } from 'ng-zorro-antd/message';
// eslint-disable-next-line camelcase
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromAuth from 'app/ngrx/auth/reducers';
import * as fromCheckout from 'app/ngrx/checkout/reducers';
import { AddressActions } from 'app/ngrx/checkout/actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VSAddressesUpdateComponent } from 'app/views/partials/addresses';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  @Input() shoppingCart: any;
  @Input() itemCount: number;
  @Input() totalQuantity: number;
  @Input() cartPrice: number;
  @Input() loading: boolean;
  @Output() add = new EventEmitter<AddToCartProps>();
  @Output() remove = new EventEmitter<number>();
  @Output() reduce = new EventEmitter<ReduceFromCartProps>();
  @Output() changed = new EventEmitter<ChangedAddToOrderProps>();
  @Output() changedAll = new EventEmitter<boolean>();
  @Output() changedPackage = new EventEmitter<ChangedOrderAllProps>();
  @Output() apply = new EventEmitter<string>();
  @Output() removeList = new EventEmitter<string>();

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  people$: Observable<IPeople>;
  people: IPeople;
  addresses$: Observable<IAddresses[]>;
  addresses: IAddresses[];

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private msg: NzMessageService,
    private i18n: NzI18nService,
    public router: Router,
    private authStore: Store<fromAuth.State>,
    private store: Store<fromCheckout.State>,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.i18n.setLocale(en_US);

    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
    this.addresses$ = store.pipe(select(fromCheckout.getAddressesFetched));
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
      if (this.people) {
        this.store.dispatch(AddressActions.fetchAddresses({ query: { 'personId.equals': this.people.id } }));
      }
    });

    this.addresses$.pipe(takeUntil(this.unsubscribe$)).subscribe(addresses => {
      this.addresses = addresses;
    });
  }

  onAdd(id, quantity): void {
    const props: AddToCartProps = {
      id,
      quantity: parseInt(quantity, 10),
    };

    this.add.emit(props);
  }

  onReduce(id, quantity): void {
    const props: ReduceFromCartProps = {
      id,
      quantity: parseInt(quantity, 10),
    };

    this.reduce.emit(props);
  }

  cancel(): void {
    this.msg.info('click cancel');
  }

  confirm(): void {
    const deleteList = [];

    if (this.shoppingCart.cart && this.shoppingCart.cart.cartDetails) {
      this.shoppingCart.cart.cartDetails.cartPackages.map(item => {
        item.cartItems.map(x => {
          if (x.selectOrder) {
            deleteList.push(x.cartItemId);
          }
        });
      });
    }

    this.removeList.emit(deleteList.join(','));
  }

  onItemChecked(id: number, checked: boolean): void {
    const props: ChangedAddToOrderProps = {
      id,
      isAddToOrder: checked,
    };
    this.changed.emit(props);
  }

  onAllChecked(checked: boolean): void {
    this.changedAll.emit(checked);
  }

  onPackageChecked(checked: boolean, packageId: number): void {
    console.log('checked', checked);
    this.changedPackage.emit({ checked, packageId });
  }

  proceedToCheckout(): void {
    if (this.addresses.length > 0) {
      this.router.navigate(['/checkout/form']);
    } else {
      this.createAddressModal();
    }
  }

  createAddressModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Shipping Address',
      nzContent: VSAddressesUpdateComponent,
      nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        addresses: new Addresses(),
        title: 'Shipping Address',
        subtitle: 'Address List',
        isShipping: true,
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'Cancel',
          type: 'default',
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Save',
          type: 'primary',
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onClick: componentInstance => {
            componentInstance.submitForm();
          },
        },
      ],
      nzWidth: '1000px',
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    modal.afterClose.subscribe(result => {
      console.log('[afterClose] The result is:', result);

      if (result.data === 'success') {
        this.router.navigate(['/checkout/form']);
      }
    });

    // setTimeout(() => {
    //   instance.subtitle = 'sub title is changed';
    // }, 2000);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
