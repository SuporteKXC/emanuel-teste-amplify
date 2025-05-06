import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  CreateAdminActions as Actions,
  CreateAdminRequestAction as RequestAction,
} from 'store/ducks/admins';

export function* createAdminRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.post, `auth/register/admin`, postData);
    onSuccess && onSuccess();
    notify('success', 'Administrador criado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
