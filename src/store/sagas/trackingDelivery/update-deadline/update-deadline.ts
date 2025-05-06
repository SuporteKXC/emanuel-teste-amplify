import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  UpdateDeadlineActions as Actions,
  UpdateDeadlineRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/update-deadline';

export function* updateDeadlineRequest(action: any) {
  const { putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `documents/deadline-date`, putData);
    onSuccess && onSuccess();
    notify('success', 'Prazo de entrega atualizada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
