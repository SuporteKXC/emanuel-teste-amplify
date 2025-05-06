import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchStockOrderActions as Actions,
  FetchStockOrderRequestAction as RequestAction,
} from 'store/ducks/stockOrders';

export function* fetchStockOrderRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(api.get, `stock-orders/${id}`);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
