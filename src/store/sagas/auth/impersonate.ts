import { all, call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  AuthActions,
  ImpersonateActions,
  ImpersonateRequestAction,
} from 'store/ducks/auth';

export function* impersonateRequest(action: any) {
  const { postData, onSuccess, onFailure }: ImpersonateRequestAction = action;
  try {
    const { data } = yield call(api.post, 'auth/impersonate', postData);
    if (api?.defaults?.headers?.common) {
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }
    onSuccess && onSuccess();
    notify('success', `Você se logou como ${data?.profile?.name}`);
    yield all([
      put(ImpersonateActions.success()),
      put(AuthActions.setData(data)),
    ]);
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(ImpersonateActions.failure(errorMessage));
  }
}
