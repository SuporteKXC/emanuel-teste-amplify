import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  PermissionRequestAction,
  PermissionActions
} from 'store/ducks/general'

export function* permissionRequest(action: any) {
  const { onSuccess, onFailure }: PermissionRequestAction = action;

  try {
    const { data } = yield call(api.get, "/permission/actions");
    onSuccess && onSuccess(data);
    yield all([
      put(PermissionActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    // notify('error', errorMessage);
    console.log(error)
    yield put(PermissionActions.failure(errorMessage));
  }
}