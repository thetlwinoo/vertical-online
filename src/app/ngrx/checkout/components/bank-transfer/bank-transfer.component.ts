/* eslint-disable guard-for-in */
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SERVER_API_URL } from '@vertical/constants';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subject } from 'rxjs';
import * as moment from 'moment';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPeople, BankTransferProps, ICustomerPaymentBankTransfer, CustomerPaymentBankTransfer } from '@vertical/models';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BankTransferComponent implements OnInit, OnDestroy {
  @Input() bankList: any[];
  @Input() loading: boolean;
  @Input() amount: number;
  @Output() bankTransfer = new EventEmitter<ICustomerPaymentBankTransfer>();

  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  people$: Observable<IPeople>;
  people: IPeople;

  uploadInd = false;
  bankTransferForm!: FormGroup;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private msg: NzMessageService, private i18n: NzI18nService, private fb: FormBuilder, private store: Store<fromAuth.State>) {
    this.i18n.setLocale(en_US);

    this.people$ = store.pipe(select(fromAuth.getPeopleFetched));
  }

  get receiptImageUrl(): string {
    return this.bankTransferForm.get('receiptImageUrl').value;
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
      this.createBankTransferForm();
    });
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

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.bankTransferForm.patchValue({ receiptImageUrl: info.file.response.id });
        this.loading = false;
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  today(): Date {
    return moment().toDate();
  }

  confirm(): void {}

  createBankTransferForm(): void {
    this.bankTransferForm = this.fb.group({
      nameInBankAccount: [null, [Validators.required]],
      bankName: [null, [Validators.required]],
      dateOfTransfer: [null, [Validators.required]],
      receiptImageUrl: [null, [Validators.required]],
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.bankTransferForm.reset();
    // tslint:disable-next-line: forin
    for (const key in this.bankTransferForm.controls) {
      this.bankTransferForm.controls[key].markAsPristine();
      this.bankTransferForm.controls[key].updateValueAndValidity();
    }
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.bankTransferForm.controls) {
      this.bankTransferForm.controls[i].markAsDirty();
      this.bankTransferForm.controls[i].updateValueAndValidity();
    }

    if (this.bankTransferForm.valid) {
      const bankTransfer: ICustomerPaymentBankTransfer = new CustomerPaymentBankTransfer();
      const rawValue = this.bankTransferForm.getRawValue();
      bankTransfer.nameInBankAccount = rawValue.nameInBankAccount;
      bankTransfer.dateOfTransfer = moment(rawValue.dateOfTransfer);
      bankTransfer.receiptImageUrl = rawValue.receiptImageUrl;
      bankTransfer.amountTransferred = this.amount;
      bankTransfer.lastEdityBy = this.people.fullName;
      bankTransfer.lastEditedWhen = moment();
      console.log(bankTransfer);
      this.bankTransfer.emit(bankTransfer);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // private getBase64(img: File, callback: (img: string) => void): void {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result.toString()));
  //   reader.readAsDataURL(img);
  // }
}
