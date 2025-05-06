import { call, put } from '@redux-saga/core/effects';
import { apiImport, notify, apiErrorHandler } from 'services';
import {
  FetchTrackingTransitTimeActions as Actions,
  FetchTrackingTransitTimeRequestAction as RequestAction,
} from 'store/ducks/general';

export function* fetchTrackingTransitTimeRequest(action: any) {
  const { id, onSuccess, onFailure }: RequestAction = action;
  try {
    const { data } = yield call(apiImport.get, `transit-times/${id}`);
    onSuccess && onSuccess(data);
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
