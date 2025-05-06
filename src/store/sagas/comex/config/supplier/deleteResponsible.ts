import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import { DeleteSupplierResponsibleActions, DeleteSupplierResponsibleRequestAction } from 'store/ducks';


export function* deleteResponsibleSupplierRequest(action: any) {
  const { id, onSuccess, onFailure }: DeleteSupplierResponsibleRequestAction = action;

  try {
    const url = `/user-supplier/delete/${id}`
    const { data } = yield call(api.delete, url);
    const userList = data
    onSuccess && onSuccess(userList);
    console.log("data",userList)
    yield all([
      put(DeleteSupplierResponsibleActions.success(userList))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(DeleteSupplierResponsibleActions.failure(errorMessage));
  }
}