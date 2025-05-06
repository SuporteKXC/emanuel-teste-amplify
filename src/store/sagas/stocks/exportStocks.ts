import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ExportStocksActions as Actions,
  ExportStocksRequestAction as RequestAction,
} from 'store/ducks/stocks';

export function* exportStocksRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('stocks/export', {
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
