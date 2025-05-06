import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  DeleteCarrierActions as Actions,
  DeleteCarrierRequestAction as RequestAction,
} from 'store/ducks/general';

export function* deleteCarrierRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.delete, `carriers/${id}`);
    onSuccess && onSuccess();
    notify('success', 'Transportadora excluída com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
