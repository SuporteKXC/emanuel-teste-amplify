import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UserRequestAction,
  UserActions
} from 'store/ducks'

export function* userRequest(action: any) {
  const { onSuccess, onFailure }: UserRequestAction = action;

  try {
    const { data } = yield call(api.get, `/user/index`);
    onSuccess && onSuccess(data);
    yield all([
      put(UserActions.success(data))
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(UserActions.failure(errorMessage));
  }
}