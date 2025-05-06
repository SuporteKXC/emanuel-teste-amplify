import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, formDataBuilder } from 'services';
import {
  CreateStockOrderActions as Actions,
  CreateStockOrderRequestAction as RequestAction,
} from 'store/ducks/stockOrders';

export function* createStockOrderRequest(action: any) {
  const { postData, onSuccess, onFailure }: RequestAction = action;
  try {
    yield call(api.post, `stock-orders`, postData);
    onSuccess && onSuccess();
    notify('success', 'Solicitação de estoque criada com sucesso');
    yield put(Actions.success());
  } catch (error) {
    const { errorMessage, validationErrors } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage, validationErrors));
  }
}
