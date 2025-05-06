import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  UpdateDeliveryDateActions as Actions,
  UpdateDeliveryDateRequestAction as RequestAction,
} from 'store/ducks/trackingDelivery/update-delivery-date';

export function* updateDeliveryDateRequest(action: any) {
  const { putData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(apiStocks.post, `documents/delivery-date`, putData);
    onSuccess && onSuccess();
    notify('success', 'Data de entrega atualizada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
