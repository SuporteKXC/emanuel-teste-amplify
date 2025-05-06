import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  DeleteAdminActions as Actions,
  DeleteAdminRequestAction as RequestAction,
} from 'store/ducks/admins';

export function* deleteAdminRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.delete, `admins/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Administrador removido com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
