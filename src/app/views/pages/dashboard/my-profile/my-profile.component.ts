import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { UploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '@eps/core';
import { Account } from '@eps/core/user/account.model';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { Store, select } from '@ngrx/store';
import { PeopleActions } from 'app/ngrx/auth/actions';
import { IPeople, IPhotos, Photos } from '@eps/models';
import { takeUntil, filter, map } from 'rxjs/operators';
import { SERVER_API_URL } from '@eps/constants';
import { PhotosService } from '@eps/services';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  account: Account;
  validateForm!: FormGroup;
  loading = false;
  avatarUrl?: string;
  people$: Observable<IPeople>;
  people: IPeople;
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/photos';
  public extendUrl = SERVER_API_URL + 'services/vscommerce/api/photos-extend';
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromAuth.State>,
    private fb: FormBuilder,
    private i18n: NzI18nService,
    private msg: NzMessageService,
    private accountService: AccountService,
    private photosService: PhotosService
  ) {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });

    this.people$ = store.pipe(select(fromAuth.getPeopleFetched));
  }

  submitForm(): void {
    if (this.validateForm.valid && this.people) {
      const formValue = this.validateForm.value;
      const object = { ...this.people };
      object.fullName = formValue.fullName;
      object.gender = formValue.gender;
      object.phoneNumber = formValue.phoneNumber;
      object.dateOfBirth = formValue.dateOfBirth;
      this.store.dispatch(PeopleActions.saveProfile({ people: object }));
    }
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  ngOnInit(): void {
    this.i18n.setLocale(en_US);

    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = _.clone(item, true);
      this.validateForm = this.createForm();
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      fullName: [this.people ? this.people.fullName : null, [Validators.required]],
      gender: [this.people ? this.people.gender : null, [Validators.required]],
      phoneNumberPrefix: ['+95'],
      phoneNumber: [this.people ? this.people.phoneNumber : null],
      profileId: [this.people ? this.people.profileId : null],
      profileThumbnailUrl: [this.people ? this.people.profileThumbnailUrl : null],
      dateOfBirth: [this.people ? this.people.dateOfBirth : null],
    });
  }

  beforeUpload = (file: File) =>
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
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // this.getBase64(info.file.originFileObj, (img: string) => {
        //   this.loading = false;
        //   this.avatarUrl = img;
        // });
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
            entity.profileId = res.id;
            entity.profileThumbnailUrl = res.thumbnailUrl;
            this.loading = false;
          });

        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
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
