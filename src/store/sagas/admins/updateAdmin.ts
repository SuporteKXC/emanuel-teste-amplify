import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  UpdateAdminActions as Actions,
  UpdateAdminRequestAction as RequestAction,
} from 'store/ducks/admins';

export function* updateAdminRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.put, `admins/${id}`, putData);
    onSuccess && onSuccess();
    notify('success', 'Administrador atualizado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
