import { createAction, props } from '@ngrx/store';

export const fetchCollectVoucherPage = createAction('[WebSitemap/API] Fetch Collect Voucher Page');

export const fetchCollectVoucherPageSuccess = createAction(
  '[WebSitemap/API] Fetch Collect Voucher Page Success',
  props<{ payload: any }>()
);

export const collectVoucherPageFailure = createAction('[WebSitemap/API] CollectVoucher Page Failure', props<{ errorMsg: string }>());
