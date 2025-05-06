import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  RolesRequestAction,
  RolesActions
} from 'store/ducks'

export function* roleRequest(action: any) {
  const { onSuccess, onFailure }: RolesRequestAction = action;

  try {
    const { data } = yield call(api.get, `/role/index`);

    onSuccess && onSuccess(data);
    yield all([
      put(RolesActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    console.log(error)
    yield put(RolesActions.failure(errorMessage));
  }
}