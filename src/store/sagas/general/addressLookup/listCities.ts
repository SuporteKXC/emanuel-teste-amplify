import { call, put } from '@redux-saga/core/effects';
import { apiStocks, notify, apiErrorHandler, applyQueryString } from 'services';
import {
  ListCitiesActions as Actions,
  ListCitiesRequestAction as RequestAction,
} from 'store/ducks/general/addressLookup';

export function* listCitiesRequest(action: any) {
  const { query = {}, onSuccess, onFailure }: RequestAction = action;
  try {
    const url = applyQueryString('cities', query);
    const { data } = yield call(apiStocks.get, url);
    onSuccess && onSuccess(data);
    yield put(Actions.success(data));
  } catch (error) {
    const { errorMessage } = apiErrorHandler(error);
    onFailure && onFailure();
    notify('error', errorMessage);
    yield put(Actions.failure(errorMessage));
  }
}
