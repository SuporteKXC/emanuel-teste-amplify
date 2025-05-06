import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ListAvailableStocksActions as Actions,
  ListAvailableStocksRequestAction as RequestAction,
} from 'store/ducks/stockManager';

export function* listAvailableStocksRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('stock-manager/available-stocks', {
      ...query,
    });
    const { data } = yield call(api.get, url);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
