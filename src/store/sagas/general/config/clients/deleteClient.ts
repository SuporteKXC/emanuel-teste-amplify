import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  DeleteClientActions as Actions,
  DeleteClientRequestAction as RequestAction,
} from 'store/ducks/general';

export function* deleteClientRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.delete, `clients/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Cliente excluído com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
