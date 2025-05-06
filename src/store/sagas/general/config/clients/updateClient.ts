import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  UpdateClientActions as Actions,
  UpdateClientRequestAction as RequestAction,
} from 'store/ducks/general';

export function* updateClientRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.put, `clients/${id}`, putData);
    onSuccess && onSuccess();
    notify('success', 'Cliente atualizado com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
