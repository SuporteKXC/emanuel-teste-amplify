import { call, put } from '@redux-saga/core/effects';
import { api, notify, apiErrorHandler } from 'services';
import {
  FetchWarehouseActions as Actions,
  FetchWarehouseRequestAction as RequestAction,
} from 'store/ducks/warehouses';

export function* fetchWarehouseRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(api.get, `warehouses/${id}`);
    onSuccess && onSuccess();
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
