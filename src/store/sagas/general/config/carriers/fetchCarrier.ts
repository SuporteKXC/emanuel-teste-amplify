import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler } from 'services';
import {
  FetchCarrierActions as Actions,
  FetchCarrierRequestAction as RequestAction,
} from 'store/ducks/general';

export function* fetchCarrierRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(apiStocks.get, `carriers/${id}`);
    onSuccess && onSuccess(data);
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
