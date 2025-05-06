import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';

import { SupplierListRequestAction, SupplierListActions } from 'store/ducks';

export function* supplierListRequest(action: any) {
  const { params, onSuccess, onFailure }: SupplierListRequestAction = action;

  try {
    const url = applyQueryString(`/supplier/index`, params)
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(SupplierListActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(SupplierListActions.failure(errorMessage));
  }
}