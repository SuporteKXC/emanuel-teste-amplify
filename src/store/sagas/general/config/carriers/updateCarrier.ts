import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  UpdateCarrierActions as Actions,
  UpdateCarrierRequestAction as RequestAction,
} from 'store/ducks/general';

export function* updateCarrierRequest(action: any) {
  const { id, putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.put, `carriers/${id}`, putData);
    onSuccess && onSuccess();
    notify('success', 'Transportadora atualizada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
