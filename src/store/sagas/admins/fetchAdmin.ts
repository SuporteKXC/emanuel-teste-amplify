import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchAdminActions as Actions,
  FetchAdminRequestAction as RequestAction,
} from 'store/ducks/admins';

export function* fetchAdminRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(api.get, `admins/${id}`);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
