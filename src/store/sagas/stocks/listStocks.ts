import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ListStocksActions as Actions,
  ListStocksRequestAction as RequestAction,
} from 'store/ducks/stocks';

export function* listStocksRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('stocks', {
      ...query,
      asList: 1,
      orderBy: 'productName',
      direction: 'asc',
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
