import { call, put } from '@redux-saga/core/effects';
import { apiImport, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  PaginateTrackingTransitTimesActions as Actions,
  PaginateTrackingTransitTimesRequestAction as RequestAction,
} from 'store/ducks/general';

export function* paginateTrackingTransitTimesRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('transit-times', query);
    const { data } = yield call(apiImport.get, url);
    onSuccess && onSuccess();
    yield put(Actions.success(data.data, data.meta));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
