import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchRoleRequestAction,
  FetchRoleActions
} from 'store/ducks'

export function* fetchRoleRequest(action: any) {
  const { id, onSuccess, onFailure }: FetchRoleRequestAction = action;

  try {
    const { data } = yield call(api.get, `/role/show/${id}`);

    onSuccess && onSuccess(data);
    yield all([
      put(FetchRoleActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(FetchRoleActions.failure(errorMessage));
  }
}