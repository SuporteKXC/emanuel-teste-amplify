import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import { UserSupplierListActions, UserSupplierListRequestAction } from 'store/ducks';


export function* userSupplierListRequest(action: any) {
  const { params, onSuccess, onFailure }: UserSupplierListRequestAction = action;

  try {
    const url = applyQueryString(`/user-supplier/filter`, params)
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess(data);
    yield all([
      put(UserSupplierListActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(UserSupplierListActions.failure(errorMessage));
  }
}