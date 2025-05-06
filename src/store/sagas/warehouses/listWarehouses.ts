import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ListWarehousesActions as Actions,
  ListWarehousesRequestAction as RequestAction,
} from 'store/ducks/warehouses';

export function* listWarehousesRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('warehouses', {
      ...query,
      asList: 1,
      orderBy: 'tradeName',
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
