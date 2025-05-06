import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  AuthActions,
  LoginActions,
  LoginRequestAction,
} from 'store/ducks/auth';
import { PaginationParamsCacheActions } from 'store/ducks/paginationCache';

export function* loginRequest(action: any) {
  const { postData, onSuccess, onFailure }: LoginRequestAction = action;
  try {
    const { data } = yield call(api.post, 'auth/login', postData);
    if (api?.defaults?.headers?.common) {
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }
    onSuccess && onSuccess();
    notify('success', 'Bem vindo');
    yield all([
      put(PaginationParamsCacheActions.reset()),
      put(LoginActions.success()),
      put(AuthActions.setData(data)),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(LoginActions.failure(errorMessage));
  }
}
