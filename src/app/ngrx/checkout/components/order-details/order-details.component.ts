import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnChanges,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { IOrders, IPeople, ICustomers, ChangeDeliveryMethodProps, IAddresses, ChangedAddToOrderProps } from '@vertical/models';
import { SERVER_API_URL } from '@vertical/constants';
import * as moment from 'moment';
import { VSAddressesUpdateComponent } from '@vertical/components/addresses-update/addresses-update.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as _ from 'lodash';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderDetailsComponent implements OnInit, OnChanges {
  @Input() shoppingCart;
  @Input() cartPrice;
  @Input() addresses;
  @Input() totalQuantity;
  @Input() people: IPeople;
  @Input() customer: ICustomers;
  @Output() post = new EventEmitter<IOrders>();
  @Output() updateAddress = new EventEmitter<IAddresses>();
  @Output() removeItem = new EventEmitter<ChangedAddToOrderProps>();
  @Output() changeDeliveryMethod = new EventEmitter<ChangeDeliveryMethodProps>();

  addNewAddressInd = false;
  deliveryAddress: IAddresses;
  billingAddress: IAddresses;
  editContact = false;
  editEmail = false;
  contactNumber: string;
  contactEmail: string;

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef, private cdk: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('customer', this.customer, this.addresses);
    if (this.addresses && this.customer) {
      this.deliveryAddress = this.addresses.filter(x => x.id === this.customer.deliveryAddressId)[0];
      this.billingAddress = this.addresses.filter(x => x.id === this.customer.billToAddressId)[0];

      this.contactNumber = this.deliveryAddress?.contactNumber;
      this.contactEmail = this.deliveryAddress?.contactEmailAddress;
    }
  }

  onCancel(event): void {
    this.addNewAddressInd = false;
  }

  getShortDate(day: number): string {
    return moment()
      .add(day, 'days')
      .format('DD MMM');
  }

  onChangeDeliveryMethod(deliveryMethodId: number, checked: boolean, cartId: number, supplierId: number): void {
    console.log(checked, deliveryMethodId, cartId, supplierId);
    if (!checked) {
      this.changeDeliveryMethod.emit({ deliveryMethodId, cartId, supplierId });
    }
  }

  createAddressModal(isShipping: boolean): void {
    const modal = this.modal.create({
      nzTitle: isShipping ? 'Shipping Address' : 'Billing Address',
      nzContent: VSAddressesUpdateComponent,
      nzViewContainerRef: this.viewContainerRef,
      // nzGetContainer: () => document.body,
      nzComponentParams: {
        title: isShipping ? 'Shipping Address' : 'Billing Address',
        subtitle: 'Address List',
        isShipping,
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
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  onEditContact(contactNumber: string): void {
    const address = _.clone(this.deliveryAddress, true);
    address.contactNumber = this.contactNumber;
    this.updateAddress.emit(address);
    this.editContact = false;
  }

  onEditEmail(email: string): void {
    const address = _.clone(this.deliveryAddress, true);
    address.contactEmailAddress = this.contactEmail;
    this.updateAddress.emit(address);
    this.editEmail = false;
  }

  onRemoveItem(id: number): void {
    const props: ChangedAddToOrderProps = {
      id,
      isAddToOrder: false,
    };
    this.removeItem.emit(props);
  }
}
