import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  PaginateClientsActions as Actions,
  PaginateClientsRequestAction as RequestAction,
} from 'store/ducks/general';

export function* paginateClientsRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('clients', query);
    const { data } = yield call(apiStocks.get, url);
    onSuccess && onSuccess();
    yield put(Actions.success(data.data, data.meta));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
