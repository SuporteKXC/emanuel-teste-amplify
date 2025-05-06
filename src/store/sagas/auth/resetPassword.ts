import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  ResetPasswordActions as MainActions,
  ResetPasswordRequestAction as RequestActions,
} from 'store/ducks/auth';

export function* resetPasswordRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestActions = action;
  try {
    yield call(api.post, 'auth/pwd-reset/reset', postData);

    onSuccess && onSuccess();
    notify('success', `Sua senha foi redefinida com sucesso`);
    yield put(MainActions.success());
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(MainActions.failure());
  }
}
