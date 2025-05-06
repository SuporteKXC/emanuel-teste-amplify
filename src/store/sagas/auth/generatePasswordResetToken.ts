import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  GeneratePasswordResetTokenActions as MainActions,
  GeneratePasswordResetTokenRequestAction as RequestActions,
} from 'store/ducks/auth';

export function* generatePasswordResetTokenRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestActions = action;
  try {
    yield call(api.post, 'auth/pwd-reset/generate-token', postData);

    onSuccess && onSuccess(postData.email);
    notify(
      'success',
      `Cheque o seu e-mail para obter o código de recuperação de senha`
    );
    yield put(MainActions.success());
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(MainActions.failure());
  }
}
