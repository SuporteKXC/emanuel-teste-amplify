import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import { ResponsibleSupplierListActions, ResponsibleSupplierListRequestAction } from 'store/ducks';


export function* supplierResponsibleListRequest(action: any) {
  const { id, onSuccess, onFailure }: ResponsibleSupplierListRequestAction = action;

  try {
    const url = `/supplier/users/${id}`
    const { data } = yield call(api.get, url);
    const userList = data
    onSuccess && onSuccess(userList);
    console.log("data",userList)
    yield all([
      put(ResponsibleSupplierListActions.success(userList))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(ResponsibleSupplierListActions.failure(errorMessage));
  }
}