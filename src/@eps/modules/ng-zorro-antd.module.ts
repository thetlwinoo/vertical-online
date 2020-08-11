import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzElementPatchModule } from 'ng-zorro-antd/core/element-patch';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import {
  UserOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  TeamOutline,
  CheckCircleTwoTone,
  CreditCardOutline,
  WalletOutline,
  HomeOutline,
  HeartOutline,
  HeartFill,
  ColumnWidthOutline,
  StarOutline,
  CommentOutline,
  SolutionOutline,
  ShoppingOutline,
  PlusOutline,
  MinusOutline,
  PictureTwoTone,
  HeartTwoTone,
  ShareAltOutline,
  CopyOutline,
  MailOutline,
  AppstoreOutline,
  SettingOutline,
  FullscreenOutline,
  LeftSquareFill,
  RightSquareFill,
  FacebookFill,
  InstagramFill,
  TwitterSquareFill,
  StarFill,
  ShoppingCartOutline,
  DeleteOutline,
  PlusSquareFill,
  MinusSquareFill,
  EditOutline,
  SafetyOutline,
  LikeFill,
  BellFill,
  CaretRightOutline,
  EnvironmentOutline,
  BookOutline,
  MobileOutline,
  WarningFill,
  MenuOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  UserOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  TeamOutline,
  CheckCircleTwoTone,
  CreditCardOutline,
  WalletOutline,
  HomeOutline,
  HeartOutline,
  HeartFill,
  ColumnWidthOutline,
  StarOutline,
  CommentOutline,
  SolutionOutline,
  ShoppingOutline,
  PlusOutline,
  MinusOutline,
  PictureTwoTone,
  HeartTwoTone,
  ShareAltOutline,
  CopyOutline,
  MailOutline,
  AppstoreOutline,
  SettingOutline,
  FullscreenOutline,
  LeftSquareFill,
  RightSquareFill,
  FacebookFill,
  InstagramFill,
  TwitterSquareFill,
  StarFill,
  ShoppingCartOutline,
  DeleteOutline,
  PlusSquareFill,
  MinusSquareFill,
  EditOutline,
  SafetyOutline,
  LikeFill,
  BellFill,
  CaretRightOutline,
  EnvironmentOutline,
  BookOutline,
  MobileOutline,
  WarningFill,
  MenuOutline,
];

@NgModule({
  imports: [NzIconModule.forRoot(icons)],
  exports: [
    NzLayoutModule,
    NzListModule,
    NzButtonModule,
    NzTabsModule,
    NzCardModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzResultModule,
    NzEmptyModule,
    NzBadgeModule,
    NzTableModule,
    NzDropDownModule,
    NzTagModule,
    NzBreadCrumbModule,
    NzAffixModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzInputNumberModule,
    NzSliderModule,
    NzCheckboxModule,
    NzTreeModule,
    NzSelectModule,
    NzRadioModule,
    NzDatePickerModule,
    NzUploadModule,
    NzDividerModule,
    NzRateModule,
    NzMenuModule,
    NzSpaceModule,
    NzBackTopModule,
    NzProgressModule,
    NzToolTipModule,
    NzPopoverModule,
    NzSkeletonModule,
    NzSwitchModule,
    NzCommentModule,
    NzAvatarModule,
    NzPaginationModule,
    NzPageHeaderModule,
    NzTypographyModule,
    NzElementPatchModule,
    NzSpinModule,
    NzModalModule,
    NzCollapseModule,
    NzStatisticModule,
    NzDescriptionsModule,
  ],
})
export class NgZorroAntdModule {}
